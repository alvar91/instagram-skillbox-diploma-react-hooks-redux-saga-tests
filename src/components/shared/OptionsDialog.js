import React from "react";
import PropTypes from "prop-types";
import { useOptionsDialogStyles } from "../../styles";
import { Dialog, Zoom, Button, Divider } from "@material-ui/core";

function OptionsDialog({ linkToPost, onClose }) {
  const classes = useOptionsDialogStyles();

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper,
      }}
      onClose={onClose}
      TransitionComponent={Zoom}
    >
      <Button className={classes.button}>
        <a href={linkToPost} target="_blank" rel="noopener noreferrer">
          Go to Unsplash post
        </a>
      </Button>
      <Divider />
      <Button onClick={onClose} className={classes.button}>
        Cancel
      </Button>
    </Dialog>
  );
}

OptionsDialog.propTypes = {
  linkToPost: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OptionsDialog;
