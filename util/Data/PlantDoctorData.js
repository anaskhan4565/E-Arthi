{
    "fertilizerCombinations": [
      {
        "id": "mop-tsp-urea",
        "name": "MOP/TSP/Urea",
        "components": [
          {
            "name": "MOP",
            "amount": "4.5kg",
            "bagPortion": "(1/4 bag)"
          },
          {
            "name": "TSP",
            "amount": "1.8kg",
            "bagPortion": "(1/4 bag)"
          },
          {
            "name": "Urea",
            "amount": "3kg",
            "bagPortion": "(1/4 bag)"
          }
        ]
      },
      {
        "id": "10-26-26-tsp-urea",
        "name": "10-26-26/TSP/Urea",
        "components": [
          {
            "name": "10-26-26",
            "amount": "1kg",
            "bagPortion": "(1/4 bag)"
          },
          {
            "name": "TSP",
            "amount": "1.8kg",
            "bagPortion": "(1/4 bag)"
          },
          {
            "name": "Urea",
            "amount": "2kg",
            "bagPortion": "(1/2 bag)"
          }
        ]
      },
      {
        "id": "dap-mop-urea",
        "name": "DAP/MOP/Urea",
        "components": [
          {
            "name": "DAP",
            "amount": "1.8kg",
            "bagPortion": "(1/4 bag)"
          },
          {
            "name": "MOP",
            "amount": "4.5kg",
            "bagPortion": "(1/4 bag)"
          },
          {
            "name": "Urea",
            "amount": "2.7kg",
            "bagPortion": "(1/2 bag)"
          }
        ]
      }
    ],
    "applicationInstructions": {
      "mopTspUrea": {
        "title": "MOP/TSP/Urea",
        "subtitle": "Fertilization for one year",
        "instructionText": "Apply the following amounts:",
        "components": [
          {
            "name": "MOP",
            "amount": "4.5kg",
            "bagPortion": "(1/4 bag)"
          },
          {
            "name": "TSP",
            "amount": "1.8kg",
            "bagPortion": "(1/4 bag)"
          },
          {
            "name": "Urea",
            "amount": "3kg",
            "bagPortion": "(3/4 bag)"
          }
        ],
        "steps": [
          "Apply fertilizer in a ring around the tree trunk, about 30cm from the base.",
          "Divide the total fertilizer into 3 applications per year.",
          "First application: at the beginning of the rainy season.",
          "Second application: middle of the rainy season.",
          "Third application: end of the rainy season.",
          "Lightly incorporate the fertilizer into the soil and water well after application."
        ]
      }
    },
    "pestsAndDiseases": [
      {
        "id": "aphids",
        "name": "Aphids",
        "riskLevel": "Moderate Risk",
        "riskColor": "#FFB800",
        "type": "Insect",
        "affectedCrops": ["apple", "grape", "bean", "capsicum"]
      },
      {
        "id": "sooty-mold",
        "name": "Sooty Mold",
        "riskLevel": "Moderate Risk",
        "riskColor": "#4285F4",
        "type": "Fungus",
        "affectedCrops": ["apple", "grape", "cucumber"]
      },
      {
        "id": "thrips",
        "name": "Thrips",
        "riskLevel": "Moderate Risk",
        "riskColor": "#00C851",
        "type": "Insect",
        "affectedCrops": ["apple", "grape", "bean"]
      },
      {
        "id": "nematodes",
        "name": "Nematodes",
        "riskLevel": "High Risk",
        "riskColor": "#FF5252",
        "type": "Other",
        "affectedCrops": ["grape", "capsicum", "cucumber"]
      },
      {
        "id": "sunburn",
        "name": "Sunburn",
        "riskLevel": "Moderate Risk",
        "riskColor": "#AA66CC",
        "type": "Other",
        "affectedCrops": ["banana", "apple", "grape"]
      }
    ]
  }