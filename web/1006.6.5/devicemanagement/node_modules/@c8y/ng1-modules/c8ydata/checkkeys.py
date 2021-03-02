#!/usr/bin/python
import os
import json

checkedLocale = "de"
dictionary = {}

for root, dirs, files in os.walk("locales"):
    for file in files:
        if file.endswith(".json"):
            file = os.path.join(root, file)
            with open(file) as jsonf:
                translations = json.load(jsonf)[checkedLocale]
                for key, translation in translations.iteritems():
                    if key in dictionary and dictionary[key] != translation:
                        print "Inconsistent translation for '" + key + "' in '" + file + "': '",
                        print translation,
                        print "' (earlier listed as '",
                        print dictionary[key],
                        print "')"
                    dictionary[key] = translation
