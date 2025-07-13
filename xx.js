function findMaxDuplicateChar(str: string): string {
  let count=[]
  for(i=0;i<str.length;i++){
    const char = str.charAt(i);
    for (let j=0;j<char.length;j++){
      if(char===char[j]){
        count[i]++;
      }
    }
  }
  let max=0
  for(s=0;s<count.length;s++){
      for(z=0;z<count.length;z++){
        if(count[s]>count[z]){
          max=count[s]
        }
      }
  }
  return str[max]
}

示例

findMaxDuplicateChar('hello world') // 返回 'l'

findMaxDuplicateChar('javascript') // 返回 'a'

findMaxDuplicateChar('Programming') // 返回 'r'

findMaxDuplicateChar('abc123') // 返回 'a' (只有一个重复字母时返回任意一个)

















