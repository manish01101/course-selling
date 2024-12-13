import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../config";
import PropTypes from "prop-types";

const UpdateCourseButton = ({ course, onCourseUpdated }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [imageLink, setImageLink] = useState(course.imageLink);
  const [price, setPrice] = useState(course.price);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/admin/courses/${course._id}`,
        { title, description, imageLink, price: parseFloat(price) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Course updated successfully:", response.data);
      alert(response.data.message);

      onCourseUpdated();

      setOpen(false);
    } catch (error) {
      console.error("Failed to update course", error);
    }
  };

  return (
    <>
      <Button variant="contained" size="large" onClick={handleClickOpen}>
        Update
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Course</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Course Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            margin="dense"
            label="Course Description"
            type="text"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            margin="dense"
            label="Course ImageLink"
            type="text"
            fullWidth
            variant="outlined"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Course Price"
            type="number"
            fullWidth
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

UpdateCourseButton.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageLink: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onCourseUpdated: PropTypes.func.isRequired,
};

export default UpdateCourseButton;
