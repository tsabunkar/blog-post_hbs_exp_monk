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