import pandas as pd
import matplotlib.pyplot as plt # plot library
from sklearn import tree
# from dataProcessing import * # dummy encoding
from sklearn.preprocessing import OneHotEncoder # best codification for categorical data
import sys

hi_in = sys.argv[1] #value1
age_in = sys.argv[2] #value2
diagnosis_in = sys.argv[3] #value3
specialty_in = sys.argv[4] #value4
gender_in = sys.argv[5] #value5
day_in = sys.argv[6] #value6



df = pd.read_csv('finalDS.csv', header=0)

def encodeColumnDummy(df, column):
    df_copy = df.copy()
    values = df_copy.iloc[:,column].unique()
    map_to_int = {name: n for n, name in enumerate(values)}
    df_copy.iloc[:,column].replace(map_to_int, inplace = True)

    return df_copy


#add_df = pd.DataFrame(data = [['Big',25, "INSUFICIENCIA", 'Medicina Interna', 'M', 'Tuesday',0,0]],  columns= ["HI Classification", "Age", "Dianosis", "Speciality","Gender","Day","Long Stay","Length of Stay"])
df.loc[len(df)-1] = [hi_in,age_in, diagnosis_in, specialty_in, gender_in, day_in,0,0]

# Convert all the nominal values to integers (dummy version)
df2 = encodeColumnDummy(df,0) # changing health insurance
df2 = encodeColumnDummy(df2, 2) # changing Diagnosis
df2 = encodeColumnDummy(df2, 3) # changing Speciality
df2 = encodeColumnDummy(df2, 4) # changing Gender
df2 = encodeColumnDummy(df2, 5) # changing Day



# ------- functional way to get the data --------
x = df2.iloc[:,:6]  # data with the attributes
y = df2.iloc[:,6]   # results
x_input = df2.iloc[7070:7071,:6]
# dataset spliter
from sklearn.model_selection  import train_test_split # import split and test functionality
x_train, x_test, y_train, y_test = train_test_split(x,y, test_size = .6 )


# tree classifier algorithm
clf = tree.DecisionTreeClassifier() # calling the decision tree clasifier
# Naive Bayes classifier algorithm
from sklearn.naive_bayes import MultinomialNB # import gaussian classi
nb_clf = MultinomialNB()


# --- Trying one hot encoder ------
enc = OneHotEncoder(categorical_features =[0, 2, 3, 4, 5]) # One Hot encoder Specifying the categorical attributes.
enc.fit(x) #fit the encoder to the data
clf.fit(enc.transform(x_train), y_train) # create the learninf instance
nb_clf.fit(enc.transform(x_train), y_train) # Nive Bayes - Multinomial model


# prediction
predictions = clf.predict(enc.transform(x_input))
prediction_NB = nb_clf.predict(enc.transform(x_input))
print predictions
print prediction_NB
'''
# Accuracy
from sklearn.metrics import accuracy_score # impor accuracy score functionality
print 'Accuracy tree encoded data prediction',accuracy_score(y_test, predictions)
print 'todo bien todo bonito'
'''
