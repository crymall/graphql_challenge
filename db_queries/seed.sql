DROP DATABASE IF EXISTS challenge;
CREATE DATABASE challenge;

\c challenge;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  address VARCHAR,
  latitude FLOAT,
  longitude FLOAT,
  org_id INTEGER REFERENCES organizations(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  event_date DATE,
  event_time TIME,
  description TEXT,
  org_id INTEGER REFERENCES organizations(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON organizations
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON locations
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON events
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO organizations(name)
VALUES ('Google'), ('Facebook'), ('Twitter'), ('Amazon'), ('Apple');

INSERT INTO locations(name, address, latitude, longitude, org_id)
VALUES('Southern Pool', '34 Samson Ave., Bethesda, MD, 23456', 52.08650, 77.00345, 1),
('Convention Center', '659 Lothlorien Ln., Townshend, VT, 43210', 52.85226, -112.12435, 2),
('Faraway Bar', '8989 Filligree Rd., Austin, TX, 78787', -18.12488, 44.31093, 3),
('Swedish Wing', '1 Draft St., Troy, NY, 12321', 62.32380, 12.85218, 4),
('Berger Gallery', '82 Slickman Dr., Sausalito, CA, 98765', 10.20225, 29.20946, 5);

INSERT INTO events(name, event_date, event_time, description, org_id)
VALUES ('Pool Party', '1/16/2022', '14:00:00', 'Fun in the sun!', 1),
('React Conference', '2/27/2022', '09:00:00', 'Should be informative', 2),
('Happy Hour', '3/12/2022', '19:00:00', 'Drinks with friends.', 3),
('Product Meeting', '4/16/2022', '13:00:00', 'Discuss product categories.', 4),
('Art Opening', '5/10/2022', '20:00:00', 'Pablo Viglucci paintings', 5);
