package com.example.quizapp;

import android.text.Layout;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;

public class BookmarkAdapter extends RecyclerView.Adapter<BookmarkAdapter.ViewHolder> {


    private List<QuestionModel> questionModelList;

    public BookmarkAdapter(List<QuestionModel> questionModelList) {
        this.questionModelList = questionModelList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view= LayoutInflater.from(parent.getContext()).inflate(R.layout.bookmark_item,parent,false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {

        holder.setData(questionModelList.get(position).getQuestion(),questionModelList.get(position).getCorrectAns(),position);
    }

    @Override
    public int getItemCount() {
        return questionModelList.size();
    }

    class  ViewHolder extends  RecyclerView.ViewHolder
    {
        private TextView question,answer;
        private ImageButton deleteBookmark;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            question=itemView.findViewById(R.id.question);
            answer=itemView.findViewById(R.id.answer);
            deleteBookmark=itemView.findViewById(R.id.delete_bookmark);


        }

        private void setData(String question, String answer, final int position)
        {
             this.question.setText(question);
             this.answer.setText(answer);
               deleteBookmark.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {

                    questionModelList.remove(position);
                    notifyItemRemoved(position);
                }
            });
        }
    }
}
