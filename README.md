# 🏥 Surgery Time Calculator

> Website to quickly calculate pre-operative fasting and arrival times for patients

![Status](https://img.shields.io/badge/status-internal--tool-blue)
![Built With](https://img.shields.io/badge/built%20with-HTML%2FCSS%2FJS-informational)
![License](https://img.shields.io/badge/license-private-lightgrey)

This is a simple website for nurses to calculate the times needed to give to parents/guardians of patients. You input the date and time that the surgery is scheduled for, plus some optional fields, and it gives you all the times that you will need to give. Some examples of these are the solid food cutoff time, clear liquid cutoff time, and arrival time.

## Demo

You can try the website here:
https://surgery-time-calculator.netlify.app/

## Features

### Inputs

  * Surgery date & time (as HHMM or HH:MM (24 hour time))
  * Arrival offset (1 hour 15 minutes by default)
  * Optional infant & breastfeeding checkboxes
  * Surgeon block time (disabled if infant)

### Outputs

  * Surgery time (rounded)
  * Arrival time
  * Solid food cutoff time
  * Clear liquid cutoff time
  * Breast milk cutoff time (if breastfeeding)

### Other

  * Hidden side panels with “special considerations” for cases where arrival offset differs from the default

## Logic

  * Surgery time is rounded down to nearest 15 minute interval
  * If "Infant?" is checked, breastfeeding is automatically checked and surgeon block time is hidden, as it is not needed
  * Arrival time is based on their surgery start time and the arrival offset
  * Clear liquid cutoff time is 2 hours prior to arrival time
  * Solid cutoff time is 6.5 hours prior to arrival (infant) or 6.5 hours prior to surgeon block time (non-infant)
  * Breastmilk cutoff time is 4.5 hours prior to arrival (infant) or 4.5 hours prior to surgeon block time (non-infant)

## Disclaimer

This tool is intended for internal use only and should not replace clinical judgment or institutional guidelines.
