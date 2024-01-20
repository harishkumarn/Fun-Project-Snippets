import java.util.Optional;
import java.util.List;
import java.util.ArrayList;
import java.util.Scanner;

public class PrefixSearch{
	

	class Trie{
		public Trie[] next = null ;
		public boolean end = false;
		public Trie(){
			this.next = new Trie[26];
		}
	}

	private Trie trie = new Trie(); 
	public void insertWord(String word){
		Trie curr = trie;
		for(int i = 0 ;i < word.length();++i){
			if(curr.next[word.charAt(i) - 'a'] == null) {
				curr.next[word.charAt(i) - 'a'] = new Trie();
			}
			curr = curr.next[word.charAt(i) - 'a'];
		}
		curr.end = true;
	}

	private Optional<Trie> getNode(String prefix){
		Trie curr = trie;
		for(int i = 0 ;i < prefix.length();++i){
			if(curr.next[prefix.charAt(i) - 'a'] == null) {
				curr = null;
				break;
			}
			curr = curr.next[prefix.charAt(i) - 'a'] ;
		}
		return Optional.ofNullable(curr);
	}

	private List<String> dfs(Trie node, String st, List<String> searchResult){
		if(node.end) searchResult.add(st);
		for(int i = 0 ; i < 26;++i){
			if(node.next[i] != null){
				dfs(node.next[i], st + (char)('a' + i),searchResult);
			}
		}
		return searchResult;
	} 

	public List<String> searchPrefix(String prefix){
		Optional<Trie> start = getNode(prefix);
		List<String> searchResult = new ArrayList<String>();
		if(start.isEmpty()) return searchResult; 
		return dfs(start.get(),prefix,searchResult);
	}

	public void clearTrie(){
		trie  = new Trie();
	}
	
	public static void main(String[] args){
		PrefixSearch searchInstance = new PrefixSearch();
		Scanner sc = new Scanner(System.in);
		boolean runLoop = true;
		
		while(runLoop){
			System.out.println("\nEnter an option (add/search/clear/exit) \n");
			switch(sc.nextLine()){
			case "add":
				System.out.print("\nEnter word : ");
				searchInstance.insertWord(sc.nextLine());
				break;
			case "search":
				System.out.print("\nEnter search word : ");
				searchInstance.searchPrefix(sc.nextLine()).stream().forEach(System.out::println);
				break;
			case "clear":
				System.out.print("\nCleared successfully !!");
				searchInstance.clearTrie();
				break;
			case "exit":
				runLoop = false;
				break;
			default:
				System.out.print("\nPlease enter a valid option !!");
				break;
			}
		}
	}
}
