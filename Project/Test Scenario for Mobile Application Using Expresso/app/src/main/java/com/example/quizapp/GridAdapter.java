package com.example.quizapp;

import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.InterstitialAd;

public class GridAdapter extends BaseAdapter
{
    private int sets=0;
    private String category;
    private InterstitialAd mInterstitialAd;

    public GridAdapter(int sets, String category, InterstitialAd interstitialAd) {
        this.sets = sets;
        this.category = category;
        this.mInterstitialAd=interstitialAd;


    }



    @Override
    public int getCount() {
        return sets;
    }

    @Override
    public Object getItem(int i) {
        return null;
    }

    @Override
    public long getItemId(int i) {
        return 0;
    }

    @Override
    public View getView( final int i, View convertView, final ViewGroup viewGroup) {
        View view ;
        if(convertView==null)
        {
            view= LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.set_items,viewGroup,false);

        }
        else {
            view=convertView;
        }
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mInterstitialAd.setAdListener(new AdListener(){
                    @Override
                    public void onAdClosed() {
                        super.onAdClosed();
                        mInterstitialAd.loadAd(new AdRequest.Builder().build());
                        Intent qustionIntent=new Intent(viewGroup.getContext(),Questions.class);
                        qustionIntent.putExtra("category",category);
                        qustionIntent.putExtra("setNo",i+1);
                        viewGroup.getContext().startActivity(qustionIntent);
                        // Code to be executed when the interstitial ad is closed.
                    }
                });
                if(mInterstitialAd.isLoaded())
                {
                    mInterstitialAd.show();
                    return;

                }
                Intent qustionIntent=new Intent(viewGroup.getContext(),Questions.class);
                qustionIntent.putExtra("category",category);
                qustionIntent.putExtra("setNo",i+1);
                viewGroup.getContext().startActivity(qustionIntent);
            }
        });
        ((TextView)view.findViewById(R.id.textview)).setText(String.valueOf(i+1));

        return view;
    }
}
