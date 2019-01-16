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
  -isJSON : guarantee that the passed variable has a JSON type
  - noJSONStrings(Promise) : responsible for verifying that Object[key] parsed version of an originally stringified nested object doesnt contain any nested stringified object that should be rendered as a plain object
  - now(Promise) : pops milliseconds from Date object 'now' method's returned timestamp 
  - sessionExpiry(Promise) : compute the expiry timestamp of a session 
  - ofType : returns the element type of a passed element, distinguishing 'array' type from 'object'
  - elemType(Promise) : same as 'ofType' promisified
  - forcedString : force computation of an object{}[] in a displayable form
  - empty : return an empty prototype element of a requested type
  - respectLen : check if a provided length respects a maximum or minimum : Tools.respectLen(4, {min : 5})  // false
  - elemContains : know the real length of an element / how many elements an object contains
  - sameContent : check matching 1 elem vs 1 elem or 1 elem vs [elems...]
  - random : returns a random number, accepting a modulo (default : 100000000)
  - report : compute passed element/s of any type in a displayble requested format with display options 
  - wrap : call one of Tools methods in an anonymous way (closure)



 


