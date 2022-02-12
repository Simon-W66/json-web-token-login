CREATE DATABASE jwt_tutorial;
/* \c jwt_tutorial */

--download extension for uuid /* uuid will create really stong ID =>  ar325r-23423343-34653w21wt-43t34t*/
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),  
    user_name VARCHAR(255)  NOT NULL,
    user_email VARCHAR(255)  NOT NULL,
    user_password VARCHAR(255)  NOT NULL
)