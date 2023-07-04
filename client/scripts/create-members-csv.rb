# This script creates a csv file of ids and email addresses from a given list of email addresses.
# The generated CSV file is used to import memberse into Firebase authentication.
# See: https://firebase.google.com/docs/auth/admin/import-users
# 
# Importing users:
# `firebase auth:import members.csv --project nzse-372c7``
#
# Using this script: ruby create-members-csv.rb <source_file> <target_file>
# The source file should be a text file with one email address per line

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
