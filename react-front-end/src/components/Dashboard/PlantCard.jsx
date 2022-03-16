import React from "react";
import { useDrag } from "react-dnd"; // hook to wire component in DnD system as drag source
import { Button, Image, Icon, Progress, Card } from "semantic-ui-react";

export default function PlantCard({ id, url, nickname, setSelectedPlant, plant, reminder }) {

  const today = Date.now(); // get timestamps and calculate difference
  const lastWatered = reminder && new Date(reminder.last_watered);

  const timestampDiff = today - lastWatered;
  const daysDiff = Math.floor(timestampDiff / 1000 / 60 / 60 / 24); // divide by ms to convert to days
  const adjustedDaysDiff = daysDiff >= 0 ? daysDiff : 0; // adjust for same day watering

  const daysRemaining = reminder && (reminder.watering_interval - adjustedDaysDiff);
  const waterPercent = reminder && Math.round((daysRemaining / reminder.watering_interval) * 100); // takes a value between 0 and 1

  const [{ isDragging }, drag] = useDrag(() => ({ // takes the isDragging and drag methods from the useDrag hook
    type: "image",
    item: { id: id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }), // collecting func, returns truthy value
    options: { dropEffect: "move" }
  }));

  return (
    <>
      <Card id="room-plant"
        style={{
          border: isDragging ? "5px solid pink" : "0px",
          background: "#EBEBE8",
          opacity: "0.95",
        }}
        className="picture"
      >
        <div className="plant-card" ref={drag}
        >
          <Image
            src={url}
            style={{ borderRadius: "15%", width: "80px", height: "auto" }}
          />

          <div className="plant-info">
            <div className="plant-nickname">
              <b><i>{nickname}</i></b>
            </div>
            <div className="plant-progress">
              <Button animated='vertical'
                color='olive'
                size="small"
                style={{ height: "28px", width: "100%" }}
                onClick={() => {
                  setSelectedPlant(plant);
                }}>
                <Button.Content hidden>See Info</Button.Content>
                <Button.Content visible>
                  <Icon name='leaf' />
                </Button.Content>
              </Button>
              <Progress
                color="red"
                indicating
                value={waterPercent >= 0 ? daysRemaining : 0}
                progress="ratio"
                total={reminder && reminder.watering_interval}
                label="Days Left"
                style={{ fontSize: "14px" }}
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};