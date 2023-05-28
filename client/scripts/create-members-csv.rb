require 'securerandom'

source_file_name = ARGV[0]
target_file_name = ARGV[1]

emails_file = File.open(source_file_name)
email_addresses = emails_file.readlines.map(&:chomp)

csv_strings = email_addresses.map do |email_address|
  id = SecureRandom.base64(28).gsub("/", "_").gsub(/=+$/,"")
  "#{id},#{email_address}"
end

File.write(target_file_name, csv_strings.join("\n"))
