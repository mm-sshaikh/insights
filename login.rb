require 'json'

puts "enter username and password"
input = gets.chomp.split(" ")
session_info = `/usr/bin/curl "https://t1qa10.mediamath.com/api/v2.0/login" -d "user=#{input[0]}" --data-urlencode "password=#{input[1]}" -d "api_key=7cdtqa5jaw5xtwfc8ug5njs2"`
session_id = session_info.match(/(?<=sessionid=").*(?=")/)

params = {
  session_id: session_id,
  api_base: 'https://t1qa10.mediamath.com/api/v2.0/',
  org_id: '100278'
}.to_json
open('src/assets/local.json', 'w+') { |f| f.puts params }
puts session_id