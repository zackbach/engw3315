import csv
import sys

input_file = sys.argv[1]
output_file = sys.argv[2] if len(sys.argv) > 2 else "filtered.csv"

with open(input_file, "r") as infile, open(output_file, "w", newline="") as outfile:
    reader = csv.reader(infile)
    writer = csv.writer(outfile)

    for row in reader:
        if row[3].strip() == "Homework" and row[12].strip() == "ENGW 3315":
            writer.writerow(row)
