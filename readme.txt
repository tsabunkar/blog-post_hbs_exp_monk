How to inset date property/field in a document (in Robo3T):
{
    "title" : "Nodejs is Awseome",
    "category" : "technology",
    "content" : "Node.js is a JavaScript runtime built on Chrome's V8",
    "author" : "Tejas",
     "createdAt" : ISODate("2018-05-26T00:00:00.000Z")    
}

=============================================================================
{{{this.content}}} ->triple brackets parse the html tags

=============================================================================
ckeditor:
download the ckeditor from offical site and paste complete ckeditor folder 
inside public/ folder
Go to this site->
http://localhost:3000/ckeditor/samples/index.html 
(if shows up then u have successfully installed ckeditor)
Then go to ur textarea code, put this script of code there
<script src="/ckeditor/ckeditor.js"></script>
    <script>
        // Replace the <textarea id="content"> with a CKEditor
        // instance, using default configuration.
         CKEDITOR.replace('content');
    </script>
=============================================================================
monk -> ORM tool (Object relational mapping)
mongoose -> ODM tool (Object Data modeling)

=============================================================================
handlebars has built-in helpers / builtin Block Expressions like-
{{#each}} {{#if}} {{#with}}

to add custom helpers like /custom Block Expressions - {{foo}}
we need to add ->
Handlebars.registerHelper('foo', function() {

});

==============================================================================
When we deploy this application to heroku, the images stored inside the folder i.e- public/images are getting 
break.This bcoz of-
he Heroku filesystem is ephemeral - that means that any changes to the filesystem whilst the dyno is
running only last until that dyno is shut down or restarted. Each dyno boots with a clean copy of
the filesystem from the most recent deploy. This is similar to how many container based systems, 
such as Docker, operate.

In addition, under normal operations dynos will restart every day in a process known as "Cycling".
These two facts mean that the filesystem on Heroku is not suitable for PERSISTENT STORAGE of data. 
In cases where you need to store data we recommend using a database addon such as Postgres 
(for data) or a dedicated file storage service such as AWS S3 (for static files). 


Soo Instead of using file system to store the images,let me use dedicated database itself for storing this
static images.
Let me use realtional database provide by heroku -> Postgres (free addon)
Heroku Postgres :: Database :hobby-dev (hobby-dev-> is the free  plan for Postgres)
------------------------
Dashboard>(select ur application) >Resource (tab) >(new window open)Settings (tab) > Database credentials >
view credentials
------------------------



============================================================================================================