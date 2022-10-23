import csv
line = 0
last_blank_line = -1
with open('show.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
        # resource rows
        if (row['Resource Name'] != '' and row['Contact Phone'] == '' and row['Website Address'] == '' and row['Location (if applicable)'] == '' and row['NOTES'] == ''):
            if (line == last_blank_line + 1):
                print('Line ' + str(line) +
                      ' is a header: ' + row['Resource Name'])

        # blank lines
        if (row['Resource Name'] == '' and row['Contact Phone'] == '' and row['Website Address'] == '' and row['Location (if applicable)'] == '' and row['NOTES'] == ''):
            print('Line ' + str(line) + ' is a blank line')
            last_blank_line = line
        if (line <= 16):
            print('Line ' + str(line) + ' ' + str(row))

        print('Last blank line: ' + str(last_blank_line))
        line = line + 1

    # for row in reader:
    #    print(row)
