import os
import json
import numpy as np


## The code assumes the following folder structure: YEAR/NETWORK/STATION/DAY.PNG

years = [f for f in os.listdir(".") if os.path.isdir(os.path.join(".", f))]

networkFolders = []
for year in years:
    networkFolders.append(
        [
            f
            for f in os.listdir("./" + year)
            if os.path.isdir(os.path.join("./" + year, f))
        ]
    )
networks = np.unique([item for sublist in networkFolders for item in sublist])

networks = dict((key, []) for key in networks)
for network in networks:
    stationFolders = []
    for year in years:
        folderPath = os.path.join(".", year, network)
        if os.path.isdir(folderPath):
            stationFolders.append(
                [f for f in os.listdir(folderPath) if os.path.isdir(folderPath)]
            )

    networks[network] = np.unique(
        [item for sublist in stationFolders for item in sublist]
    ).tolist()


jsNetworks = "var networks = " + json.dumps(networks)

with open("variables.js", "w") as outfile:
    outfile.write(jsNetworks)


