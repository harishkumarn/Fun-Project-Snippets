import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.function.Consumer;

public class Functions{


	public static void  main(String[] args){

			Consumer<Integer> cons = (Integer val) -> System.out.println(val);
			cons.accept(69);
	}


}

