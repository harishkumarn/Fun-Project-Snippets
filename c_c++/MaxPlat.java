import  java.util.Stack;
public class MaxPlat{

	public static int getMts(String  time){
		String arr[]=time.split(":");
		return Integer.parseInt(arr[0])*60 + Integer.parseInt(arr[1]);
	}
	public static void main(String[]  argv){
		Stack<Integer> dep_s=new Stack<Integer>();

		int stack_size=0;
		String  arr[]={"9:00", "9:40", "9:50", "11:00", "15:00", "18:00"};
		String  dep[]={"9:10", "12:00", "11:20", "11:30", "19:00", "20:00"} ;
		int min_platforms=0;
		for(int i=0;i<arr.length;++i){
			int arr_mts=getMts(arr[i]);
			while(stack_size  >0 && dep_s.peek() <=  arr_mts){
				dep_s.pop();
				stack_size--;
			}
			dep_s.push(getMts(dep[i]));
			stack_size++;
			min_platforms=min_platforms < stack_size ? stack_size : min_platforms;
		}

		System.out.println(min_platforms);
	} 
}