﻿CREATE TABLE HEALTHCARE.PATIENT(
  PATIENT_ID INT PRIMARY KEY NOT NULL, 
  MRN INT NOT NULL, SSN INT NOT NULL
);
CREATE TABLE HEALTHCARE.DOCTORS(
  DOC_ID INT PRIMARY KEY NOT NULL, DOC_FIRST_NAME TEXT, 
  DOC_LAST_NAME TEXT
);
CREATE TABLE HEALTHCARE.PAT_INFO(
  PATIENT_ID INT REFERENCES HEALTHCARE.PATIENT(PATIENT_ID) NOT NULL,
  PAT_FIRST_NAME TEXT, PAT_LAST_NAME TEXT, 
  PAT_MIDDLE_NAME TEXT, PAT_DOB DATE, 
  PAT_SEX TEXT, PAT_STREET TEXT, PAT_CITY TEXT, 
  PAT_STATE TEXT, PAT_ZIP INT, PAT_PHONE INT, 
  PAT_LANGUAGE TEXT, PAT_MARITIAL_STATUS TEXT, 
  PAT_RACE TEXT, PAT_PREFERENCE TEXT
);
CREATE TABLE HEALTHCARE.VISITS(
  PATIENT_ID INT REFERENCES HEALTHCARE.PATIENT(PATIENT_ID) NOT NULL, 
  VISIT_DATE DATE, DOC_ID INT REFERENCES HEALTHCARE.DOCTORS(DOC_ID) NOT NULL, 
  DEPARTMENT TEXT, LOCATION TEXT, CHIEF_COMPLAINT TEXT, 
  VISIT_DESC TEXT
);
CREATE TABLE HEALTHCARE.ALLERGY(
  PATIENT_ID INT REFERENCES HEALTHCARE.PATIENT(PATIENT_ID) NOT NULL, ALLERGY_DATE DATE, ALLERGY TEXT, ALLERGY_CODE TEXT
);
