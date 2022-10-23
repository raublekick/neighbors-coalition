import csv
import requests
import re
line = 0
last_blank_line = -1
current_header = ""
current_category = ""
current_resource = ""
api_url_base = 'https://nominatim.openstreetmap.org/search?format=json&q='
new_fields = ['Category', 'Name', 'Tags', 'Services', 'Eligibility', 'LatLng', 'Lat',	'Lng', 'Address',
              'Hours of Operation',	'Phone', 'Website',	'Email', 'Social Media', 'Rating', 'Facebook', 'Instagram', 'Twitter', 'Source']
new_rows = []
with open('show.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
        # blank lines
        if (row['Resource Name'] == '' and row['Contact Phone'] == '' and row['Website Address'] == '' and row['Location (if applicable)'] == '' and row['NOTES'] == ''):
            print('Line ' + str(line) + ' is a blank line')
            last_blank_line = line

        # header rows
        elif (row['Resource Name'] != '' and row['Contact Phone'] == '' and row['Website Address'] == '' and row['Location (if applicable)'] == '' and row['NOTES'] == ''):
            # primary category
            if (line == last_blank_line + 1):
                current_header = row['Resource Name']
                # reset category
                current_category = ''
                print('Line ' + str(line) +
                      ' is a header: ' + current_header)
            if (line != last_blank_line + 1):
                current_category = row['Resource Name']
                print('Line ' + str(line) +
                      ' is a sub-category: ' + current_category)

        # resource rows
        else:
            # resources with on multiple lines will only have the resource on the first row of that 'block'
            # store the resource name if it's found and use it for subsequent blank resource rows
            if (row['Resource Name'] != ''):
                current_resource = row['Resource Name']
            else:
                resource = current_resource
                row['Resource Name'] = resource
            #print('Line ' + str(line) + ':' + str(row))

            # try to get lat/lng
            latlng = ''
            if (row['Location (if applicable)'] != ''):
                response = requests.get(
                    api_url_base + row['Location (if applicable)'])
                result = response.json()
                if result:
                    latlng = str(result[0]['lat']) + \
                        ', ' + str(result[0]['lon'])
            new_row = [current_header, current_resource, '', row['NOTES'], current_category, latlng, '', '',
                       row['Location (if applicable)'], '', row['Contact Phone'], row['Website Address'], '', '', '', '', '', '', 'SHOW Clinic']
            new_rows.append(new_row)
            print(str(new_row))

        # if (line <= 16):
        #     print('Line ' + str(line) + ' ' + str(row))

        #print('Last blank line: ' + str(last_blank_line))
        line = line + 1

# create new csv
filename = "show-cleaned.csv"

# writing to csv file
with open(filename, 'w') as csvfile:
    # creating a csv writer object
    csvwriter = csv.writer(csvfile)

    # writing the fields
    csvwriter.writerow(new_fields)

    # writing the data rows
    csvwriter.writerows(new_rows)
