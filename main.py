
from ast import Return
from cProfile import label
from enum import unique
from unicodedata import name
from flask import Flask, flash ,render_template, request ,redirect, url_for ,session, flash

import psycopg2
import psycopg2.extras
import os
import secrets
import re


app=Flask(__name__)

app.config['SECRET_KEY'] = 'clintoo333david0000'
conn=psycopg2.connect("dbname='duka' user='postgres' host='localhost' password='5132'")


@app.route("/")
@app.route("/signup" ,methods=["GET", "POST"])
def signup():
    msg=''
    if request.method=="POST" and 'first_name' in request.form and 'second_name' in request.form and 'password' in request.form and 'email' in request.form:
        cur=conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        first_name=request.form["first_name"]
        second_name=request.form["second_name"],
        email=request.form["email"],
        password=request.form["password"]
        


        rows=(first_name,second_name ,email ,password)
        query=("INSERT INTO public.users( first_name, second_name, email, password)VALUES ( %s, %s, %s, %s)")
        cur.execute(query,rows )
        
        conn.commit()

        
    return render_template('signup.html', msg = msg)
    
         

        
       



@app.route("/login" ,methods=["GET", "POST"])
def login():
    msg = ''
    if request.method=="POST" and 'password' in request.form and 'email' in request.form:
        cur=conn.cursor()
        
        email=request.form["email"],
        password=request.form["password"]

        query=("SELECT * from users where 'email'=%s and 'password'=%s " )
        row= (email ,password)
        cur.execute(query,row)
        users=cur.fetchone()
        conn.commit()
      

        if  users:
            session['loggedin'] = True
            session['id'] = users['id']
            session['email'] =  users['email']
            msg ='Logged in successfully!'
            return render_template('index.html', msg = msg)    
            
        else:
             msg = 'Incorrect email/password!'
    return render_template('login.html', msg = msg) 


@app.route('/logout')
def logout():
   session.pop('loggedin', None)
   session.pop('email', None)
   return render_template ('login.html')



app.run(debug=True)   