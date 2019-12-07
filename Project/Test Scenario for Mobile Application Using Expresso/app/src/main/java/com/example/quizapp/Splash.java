package com.example.quizapp;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;

public class Splash extends Activity {

    ImageView splash;
    Animation animation;
    private static int SPLASH_TIME_OUT=2000;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        splash = findViewById(R.id.splash_im);
        animation = AnimationUtils.loadAnimation(getApplicationContext(), R.anim.fade);
        splash.startAnimation(animation);
//
//        Thread thread = new Thread()
//        {
//            @Override
//            public void run() {
//
//                try
//                {
//                    sleep(3000);
//                    Intent intent=new Intent(getApplicationContext(),MainActivity.class);
//                    startActivity(intent);
//                    finish();
//                    super.run();
//                }
//                catch (InterruptedException e)
//                {
//                    e.printStackTrace();
//                }
//
//            }
//        };
//        thread.start();

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent=new Intent(Splash.this,MainActivity.class);
                Splash.this.startActivity(intent);
                Splash.this.finish();
            }
        },SPLASH_TIME_OUT);
    }
}
