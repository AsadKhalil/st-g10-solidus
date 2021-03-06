package com.example.quizapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.MenuItem;

import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import static com.example.quizapp.Questions.FILE_NAME;
import static com.example.quizapp.Questions.KEY_NAME;

public class Bookmarks extends AppCompatActivity {

     private RecyclerView recyclerView;

    private List<QuestionModel>bookmarkList;
    private SharedPreferences preferences;
    private SharedPreferences.Editor editor;
    private Gson gson;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bookmarks);

        Toolbar toolbar=findViewById(R.id.toolbar);
        loadAds();

        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("Bookmarks");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        recyclerView=findViewById(R.id.rv_bookmarks);
        LinearLayoutManager layoutManager=new LinearLayoutManager(this);
        layoutManager.setOrientation(RecyclerView.VERTICAL);

        recyclerView.setLayoutManager(layoutManager);

        preferences=getSharedPreferences(FILE_NAME, Context.MODE_PRIVATE);
        editor=preferences.edit();
        gson=new Gson();

        getBookmarks();

         BookmarkAdapter bookmarkAdapter=new BookmarkAdapter(bookmarkList);
         recyclerView.setAdapter(bookmarkAdapter);

    }
    @Override
    protected void onPause()
    {
        super.onPause();
        storeBookmarks();
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if(item.getItemId()==android.R.id.home)
        {
            finish();
        }
        return super.onOptionsItemSelected(item);
    }
    private void getBookmarks()
    {
        String json=preferences.getString(KEY_NAME, "");
        Type type= new TypeToken<List<QuestionModel>>() {}.getType();
        bookmarkList=gson.fromJson(json,type);

        if(bookmarkList==null)
        {
            bookmarkList=new ArrayList<>();
        }


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
    }

}
