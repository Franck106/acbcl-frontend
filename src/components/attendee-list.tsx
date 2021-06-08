import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { IUserResponse } from "../core/_types/userResponse";

interface AttendeeListProps {
    attendees: IUserResponse[];
}

const AttendeeList: React.FC<AttendeeListProps> = ({ attendees }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        disabled={attendees.length === 0}
      >
        {attendees.length} participant(s)
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          {attendees.map((attendee) => <MenuItem key={attendee.id} onClick={handleClose}>
              {attendee.firstName} {attendee.lastName}
          </MenuItem>)}
      </Menu>
    </div>
  );
};

export default AttendeeList;
