# utils
____________________________________________________________________________
______     ______    ______    ______    ______    ______           ∞  ____
||__||     ||__      ||  ||    ||  ||    ||__||      ||             |  |___
|| \__.    ||____    ||        ||__||    || \__.     ||     ∞    |__|  ____|      
___________________________|*javascript dev toolset*|________________|README|


*REPORT Toolset is a development module (running under nodejs environment)*

*all functions are part of the "Tools" {Object} (namespace)*

Tools methods :

  - stringifyNestedKey(Promise) : verifies if Object Object[key] is well stringified: has no nested object that is not stringified (stringifies if needed) 
  
  - isJSON : guarantee that the passed variable has a JSON type
  
  - noJSONStrings(Promise) : responsible for verifying that Object[key] parsed version of an originally stringified nested object doesnt contain any nested stringified object that should be rendered as a plain object
  
  - now(Promise) : pops milliseconds from Date object 'now' method's returned timestamp 
  
  - sessionExpiry(Promise) : compute the expiry timestamp of a session 
  
  - ofType : returns the element type of a passed element, distinguishing 'array' type from 'object'
  
  - elemType(Promise) : same as 'ofType' promisified
  
  - forcedString : force computation of an object{}[] in a displayable form
     "failMsg" : return a "can't display data" string statement instead of "undefined" is test failed
     "functionString" : return function type objects as a string "function" instead of stringified function
     (known issue : *cantdisplay* fires to often)
     
  - empty : return an empty prototype element of a requested type
      "insert"(any) : insert an element inside the new distributed element
      "assign"(object, array) : will return one object containing the "insert" object keys/value pairs 
            + the provided "assign" object key/value pairs or array pair indexes as keys and impair indexes as value 
      "preventText"(bool) : if true, return an array of a requested length of null instead of including "insert" 
                            as string(default)
      
      
  - respectLen : check if a provided length respects a maximum or minimum : Tools.respectLen(4, {min : 5})  // false
        "max" : maximum length not to overflow
        "min" : minimum length not to respect
        
  - elemContains : know the real length of an element / how many elements an object contains
        "numString"(bool) : return length of provided numbers as String(elem).length instead of default number return
        "fail"(any) : return a provided element of any type instead of default undefined 
        "restrict"(regular typeof or 'array') : request a test to determine if elem has a requested type, otherwise, return 
                  the 'fail' element 
        "minLen"(number) : restrict the test to a minimum length, return fail or undefined if passed test result is lower 
                          than minLen
        "maxLen"(number) : restrict the test to a maximum length, return fail or undefined if passed test result is higher 
                          than maxLen
        @notice : *important* 'function' type is not handled
        
  
  - sameContent : check matching 1 elem vs 1 elem or 1 elem vs [elems...]
        'lengthOnly' : test same length only   
        'length' : test exact matching + same length
  
  - random : returns a random number, accepting a modulo (default : 100000000)
  
  - validElem : guarantee the type of an element is known
  
  - isPair : guarantee a specific number is pair 
  
  - report : compute passed element/s of any type in a displayble requested format with display options 
     "type"(bool): improved version of typeof
     "length": retrieve the real length of elems depending of its type
     "inspect"(bool or string): 'true' returns all available options / "only" returns all precedent options only
     "stringify"(boolean): display JSON as strings instead of ranked list default display
     "highlight"(bool): highlights the report block
     "step": add a step text/index on title line                             
     "then": add a line after block to display a future step
     "testStart": add a test top line to indicate start of test
     "objKeys": display the keys of nested {object}
     "functionString" : dont display 'function' type objects of 'elems' nested keys as strings but display 'function' instead
     "from" : function name from which the report comes (or any other displayable information)
     "returnElement" : returns the provided element
     
  - wrap : call one of Tools methods in an anonymous way (closure)
    "returnFunction"(bool) :  if true, return an executable computed wrapped function containing the passed datas/arguments, 
                              if  false *idem "immediateCall"*
     "immediateCall"(bool) : if true, returns the execution result of the requested wrapped function, 
                              else *idem "returnFunction"*
     "promisify"(bool) : (not yet implemented, TODO) if true, return a promisified version of the wrapped function, 
                        else, return synchronized
     
  - reqTypeFrom : request an element of a specific type with any other elements nested within / as content
      "preventText": return an array of a given length instead of including provided number as a string within OR prevent object text forms [Object object] and render the real object
      
                  



 


