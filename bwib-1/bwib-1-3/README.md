# ... but will it blend ???
## p5.js
### javascript + OOP

*In this part, you will learn the basics of javascript + how to use it in your favorite editor*

## Javascript Basics

##### Control Flow #####

* Yes / No Choices: `if`, `else`
* Multiple Choices: `switch` `case`
* Repetition with Index: `for` loops

###### Yes / No Choices ######

    if(clicked === true) {
      print("clicked");
    } else {
      print("not clicked");
    }

###### Multiple Choices ######

    switch(key) {
      case '1':
        print("pressed one");
        break;
      case '2':
        print("pressed two");
        break;
    }


###### Loops ######

    for(var i = 0; i < 10; i++) {
      print("number " + i);
    }

###### Objects ######

* dynamic typing
* everything is an object
* objects can be modified on the fly
* inspect objects on the console
* determine object type with `typeof`

###### Data Structures ######

| type          | example                            |
|---------------| ---------------------------------- |
| arrays        | `a = [1,2,3];`                     |
| dictionaries  | `d = ['a': 1, 'b':2];`             |
| functions     | `f = function(x) { return x*x; };` |

###### Numbers ######

* Just numbers (no distinction between integers and floats)
* **Gotacha**: make sure to use integers when indexing arrays

| function                | p5       |  javascript     |
|-------------------------| ---------|---------------- |
| cut off fractional part | `int(x)` | `Math.trunc(x)` |

The javascript functions provided by `Math` are usually a lot faster.

###### Functions and Prototypes #####

* when called with `new` a function return a new object.
* inside the function we can construct the new object using `this`.
* if we add attributes to the prototype of a function, they will be accessible from all objects created from it.

## P5 editors ##

* [P5.js Editor App](https://github.com/processing/p5.js-editor/releases/) – source code [here](https://github.com/therewasaguy/p5js-webIDE)
* [P5.js Web IDE](https://p5ide.herokuapp.com/editor) – uses your github
* Your favourite text editor (sublime, atom, brackets ...)

#### Extras and Helpers ####

**Every good IDE should ...**

* ... help you read code (**syntax highlighting**)
* ... help you write code (**autocompletion**)
* ... help you write clean code (**linter**)
* ... help you find documentation (**live help**)
* ... give you fast feedback (**browser refresh**)
* ... give you real time feedback (**live coding**)
* ... help you track down errors (**debugger**)

The Processing IDE has all of this. Unfortunately the P5.js editor is far less mature.  
This is why you might want to use your favourite editor for bigger projects.

|                        | P5 Editor  | P5 Web IDE      | Sublime Text   | Bracket        | Atom          |
| ---------------------- | :--------: | :-------------: | :------------: | :------:       | :-----------: |
| p5 syntax highlight    | **yes**    | **yes**         | *extension*    | **yes**        | -             |
| js syntax highlight    | o          | o               | **yes**        | **yes**        | **yes**       |
| p5 autocomplete        | -          | -               | *extension*    | -              | *extension*   |
| js autocomplete        | -          | -               | **yes**        | **yes**        | *yes*         |
| live help              | -          | **extension**   | -              | -              | -             |
| fast feedback          | **yes**    | **yes**         | -              | **yes**        | **extension** |
| live coding            | -          | -               | **extension**  | -              | ?             |
| linter                 | -          | -               | **extension**  | **extension**  | **extension** |
| debugger               | browser    | browser         | browser        | browser        | browser       |




#### Extensions for the P5 Web IDE ####

* for **live help** check out my [p5js help](https://craftoid.github.io/bookmarklets/) bookmarklet.

#### Extensions for Sublime Text ####

* for **fast feedback** install the *Browser Refresh* extension
* for **live coding** check out the *Live Reload* extension. More info [here](http://www.gordich.com/blog/2015/5/10/almost-livecoding-with-sublime-and-processing-p5js)
* for p5.js **syntax hilight** and **autocompelte** try [p5.js-sublime](https://github.com/sergiomajluf/p5.js-sublime) (Sublime Text 2 only)

#### Extensions for Atom ####

* for **fast feedback** check out the [atom-html-preview]() extension
* for p5.js **autocomplete** you may try [processing-autocomplete](https://github.com/Stefterv/processing-autocomplete) (didn't work for me)
