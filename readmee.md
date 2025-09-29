```
graph TD

    27["MongoDB<br>Database"]
    4["Frontend System<br>Web Application"]
    6["User<br>External Actor"]
    subgraph 1["File Storage System<br>Filesystem"]
        28["Crop Uploads<br>Directory"]
        29["Sensor Uploads<br>Directory"]
    end
    subgraph 2["Backend System<br>Node.js / Express.js"]
        15["Main Application<br>Node.js"]
        16["DB Configuration<br>Node.js"]
        17["Controllers<br>Node.js"]
        18["Middlewares<br>Node.js"]
        25["Routes<br>Express.js"]
        26["Validators<br>Node.js"]
        subgraph 3["Models<br>Mongoose"]
            19["Consumable Model<br>Mongoose"]
            20["Crop Model<br>Mongoose"]
            21["Cycle Model<br>Mongoose"]
            22["Sensor Model<br>Mongoose"]
            23["User Model<br>Mongoose"]
            24["Counter Models<br>Mongoose"]
            %% Edges at this level (grouped by source)
            3["Models<br>Mongoose"] -->|Uses| 24["Counter Models<br>Mongoose"]
        end
        %% Edges at this level (grouped by source)
        17["Controllers<br>Node.js"] -->|Validates with| 26["Validators<br>Node.js"]
        17["Controllers<br>Node.js"] -->|Interacts with| 3["Models<br>Mongoose"]
        15["Main Application<br>Node.js"] -->|Uses| 16["DB Configuration<br>Node.js"]
        15["Main Application<br>Node.js"] -->|Initializes| 25["Routes<br>Express.js"]
        25["Routes<br>Express.js"] -->|Dispatches to| 17["Controllers<br>Node.js"]
        25["Routes<br>Express.js"] -->|Uses| 18["Middlewares<br>Node.js"]
    end
    %% Edges at this level (grouped by source)
    17["Controllers<br>Node.js"] -->|Uploads to| 28["Crop Uploads<br>Directory"]
    17["Controllers<br>Node.js"] -->|Uploads to| 29["Sensor Uploads<br>Directory"]
    2["Backend System<br>Node.js / Express.js"] -->|Stores files in| 1["File Storage System<br>Filesystem"]
    2["Backend System<br>Node.js / Express.js"] -->|Connects to| 27["MongoDB<br>Database"]
    16["DB Configuration<br>Node.js"] -->|Connects to| 27["MongoDB<br>Database"]
    6["User<br>External Actor"] -->|Interacts with| 4["Frontend System<br>Web Application"]
    4["Frontend System<br>Web Application"] -->|Calls API| 2["Backend System<br>Node.js / Express.js"]
```