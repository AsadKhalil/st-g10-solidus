package com.example.quizapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.animation.Animator;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.view.animation.DecelerateInterpolator;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.InterstitialAd;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class Questions extends AppCompatActivity {


    public static final String FILE_NAME ="QUIZAPP";
    public static final String KEY_NAME ="QUESTIONS";


    private TextView question,noIndicator;
    private FloatingActionButton bookmarkButton;
    private LinearLayout optionsContainer;
    private Button share,next;
    private int count=0;
    private int position=0;
    List<QuestionModel>questionModels;

    private String category;
    private int  setNumber;

    private Dialog loadingDialog;
    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference myRef = database.getReference();

    private int score=0;
    private int matchedQuestionPosition;

    private List<QuestionModel>bookmarkList;
    private SharedPreferences preferences;
    private SharedPreferences.Editor editor;
    private Gson gson;

    private InterstitialAd interstitialAd;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_questions);
        Toolbar toolbar=findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        loadAds();
        question=findViewById(R.id.question);
        noIndicator=findViewById(R.id.number_indicator);
        bookmarkButton=findViewById(R.id.bookmark_button);
        optionsContainer=findViewById(R.id.options_container);
        share=findViewById(R.id.share);
        next=findViewById(R.id.next);
        questionModels=new ArrayList<>();
        category=getIntent().getStringExtra("category");
        setNumber=getIntent().getIntExtra("setNo",1);

        preferences=getSharedPreferences(FILE_NAME, Context.MODE_PRIVATE);
        editor=preferences.edit();
        gson=new Gson();

        getBookmarks();

        bookmarkButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(modelMatch())
                {
                bookmarkList.remove(matchedQuestionPosition);
                bookmarkButton.setImageDrawable(getDrawable(R.drawable.bookmark_border));
                }
                else
                {
                    bookmarkList.add(questionModels.get(position));
                    bookmarkButton.setImageDrawable(getDrawable(R.drawable.bookmark));
                }
            }
        });

        loadingDialog=new Dialog(this);
        loadingDialog.setContentView(R.layout.loading);
        loadingDialog.getWindow().setBackgroundDrawable(getDrawable(R.drawable.rounded_corners));
        loadingDialog.getWindow().setLayout(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        loadingDialog.setCancelable(false);



        loadingDialog.show();
        myRef.child("SETS").child(category).child("questions").orderByChild("setNumber").equalTo(setNumber).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                for (DataSnapshot snapshot:dataSnapshot.getChildren())
                {
                    questionModels.add(snapshot.getValue(QuestionModel.class));

                }
                if(questionModels.size()>0)
                {
                    for (int i=0;i<4;i++)
                    {
                        optionsContainer.getChildAt(i).setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View view) {
                                checkAnswer((Button) view);
                            }
                        });
                    }
                    playAnimation(question,0,questionModels.get(position).getQuestion());

                    next.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            count=0;
                            next.setEnabled(false);
                            next.setAlpha(0.7f);
                            enableOption(true);
                            position++;
                            if (position==questionModels.size())
                            {
                                if(interstitialAd.isLoaded())
                                {
                                    interstitialAd.show();
                                    return;
                                }
                                Intent scoreIntent=new Intent(Questions.this,ScoreActivity.class);
                                scoreIntent.putExtra("score",score);
                                scoreIntent.putExtra("total",questionModels.size());
                                startActivity(scoreIntent);
                                //score Activity
                                finish();
                                return;
                            }
                            playAnimation(question,0,questionModels.get(position).getQuestion());
                        }
                    });
                    share.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            String body=questionModels.get(position).getQuestion() + "\n" +
                                    questionModels.get(position).getOptionA()+ "\n" +
                                    questionModels.get(position).getOptionB() + "\n" +
                                    questionModels.get(position).getOptionC()+ "\n" +
                                    questionModels.get(position).getOptionD();
                            Intent shareIntent =new Intent(Intent.ACTION_SEND);
                            shareIntent.setType("text/plain");
                            shareIntent.putExtra(Intent.EXTRA_SUBJECT,"QuizApp challenge");
                            shareIntent.putExtra(Intent.EXTRA_TEXT,body);
                            startActivity(Intent.createChooser(shareIntent,"Share via"));
                        }
                    });
                }
                else
                {
                    finish();
                    Toast.makeText(Questions.this,"no Question",Toast.LENGTH_SHORT).show();
                }
                loadingDialog.dismiss();
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

                Toast.makeText(Questions.this,databaseError.getMessage(),Toast.LENGTH_SHORT).show();
                loadingDialog.dismiss();
                finish();
            }
        });


    }


    @Override
    protected void onPause()
    {
        super.onPause();
        storeBookmarks();
    }

    private void playAnimation(final View view, final int value, final String data)
    {
        view.animate().alpha(value).scaleX(value).scaleY(value).setDuration(500).setStartDelay(100).
                setInterpolator(new DecelerateInterpolator()).setListener(new Animator.AnimatorListener() {
            @Override
            public void onAnimationStart(Animator animator) {
                if(value==0 &&count<4)
                {
                    String option="";
                    if(count==0)
                    {
                        option=questionModels.get(position).getOptionA();
                    }
                    else if(count==1)
                    {
                        option=questionModels.get(position).getOptionB();
                    }
                    else if(count==2)
                    {
                        option=questionModels.get(position).getOptionC();
                    }
                    else if(count==3)
                    {
                        option=questionModels.get(position).getOptionD();
                    }
                    playAnimation(optionsContainer.getChildAt(count),0,option);
                    count++;
                }
            }

            @Override
            public void onAnimationEnd(Animator animator) {


                if(value==0)
                {
                    try {
                        //data changed
                        ((TextView) view).setText(data);
                        noIndicator.setText(position + 1 + "/" + questionModels.size());


                        if (modelMatch()) {
                            bookmarkButton.setImageDrawable(getDrawable(R.drawable.bookmark));
                        } else {

                            bookmarkButton.setImageDrawable(getDrawable(R.drawable.bookmark_border));

                        }
                    }
                    catch (ClassCastException e)
                    {
                        ((Button)view).setText(data);
                    }
                    view.setTag(data);
                    playAnimation(view,1,data);
                }
            }

            @Override
            public void onAnimationCancel(Animator animator) {

            }

            @Override
            public void onAnimationRepeat(Animator animator) {

            }
        });
    }
    private void checkAnswer(Button selectedOption)
    {
        enableOption(false);
        next.setEnabled(true);
        next.setAlpha(1);
        if(selectedOption.getText().toString().equals(questionModels.get(position).getCorrectAns()))
        {
            selectedOption.setBackgroundTintList(ColorStateList.valueOf(Color.parseColor("#4CAF50")));
            score++;
            //correct
        }else
        {
            selectedOption.setBackgroundTintList(ColorStateList.valueOf(Color.parseColor("#ff0000")));
             Button correctOption=(Button) optionsContainer.findViewWithTag(questionModels.get(position).getCorrectAns());
            correctOption.setBackgroundTintList(ColorStateList.valueOf(Color.parseColor("#4CAF50")));

        }

    }
    private void enableOption(boolean enable)
    {
        for (int i=0;i<4;i++)
        {
          optionsContainer.getChildAt(i).setEnabled(enable);
          if(enable==true)
          {
              optionsContainer.getChildAt(i).setBackgroundTintList(ColorStateList.valueOf(Color.parseColor("#989898")));

          }
        }
    }

    private void getBookmarks()
    {
        String json= preferences.getString(KEY_NAME,"");
        Type type= new TypeToken<List<QuestionModel>>() {}.getType();

        bookmarkList=gson.fromJson(json,type);

        if(bookmarkList==null)
        {
            bookmarkList=new ArrayList<>();
        }


    }
    private boolean modelMatch()
    {
        boolean matched=false;
        int i=0;
         for (QuestionModel questionModel:bookmarkList) {

             if (questionModel.getQuestion().equals(questionModels.get(position).getQuestion()) &&
                 questionModel.getCorrectAns().equals(questionModels.get(position).getCorrectAns()) &&
                 questionModel.getSetNumber() == questionModels.get(position).getSetNumber())
             {
                 matched = true;
                 matchedQuestionPosition=i;
             }
             i++;

         }
         return  matched;

    }

    private void storeBookmarks()
    {
        String json=gson.toJson(bookmarkList);
        editor.putString(KEY_NAME,json);
        editor.commit();

    }

    private void loadAds()
    {
        AdView mAdView = findViewById(R.id.adView);
        AdRequest adRequest = new AdRequest.Builder().build();
        mAdView.loadAd(adRequest);
        interstitialAd = new InterstitialAd(this);
        interstitialAd.setAdUnitId(getResources().getString(R.string.interstitialAd_id));
        interstitialAd.loadAd(new AdRequest.Builder().build());


        interstitialAd.setAdListener(new AdListener(){
            @Override
            public void onAdClosed() {
                super.onAdClosed();
                interstitialAd.loadAd(new AdRequest.Builder().build());
                Intent scoreIntent=new Intent(Questions.this,ScoreActivity.class);
                scoreIntent.putExtra("score",score);
                scoreIntent.putExtra("total",questionModels.size());
                startActivity(scoreIntent);
                //score Activity
                finish();
                return;
                // Code to be executed when the interstitial ad is closed.
            }
        });
    }
}
