object Main extends App{

	class  Test(var  name : String ){
		def greet(country : String) :  String = s"Hi ! $name from $country, henlo world"

		def unary_! = s"WTF ? $name"
	}

	//def main(args: Array[String]):Unit = {
	var  obj : Test = new Test("Harish")
	println(obj  greet "India");
	println(!obj)
}
