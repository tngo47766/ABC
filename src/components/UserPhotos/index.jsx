import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { List, Divider, Typography, Grid, Avatar, Card, CardHeader, CardMedia, CardContent } from "@mui/material";
import models from "../../modelData/models";

const UserPhotos = () => {
  const [photos, setPhotos] = useState(null);
  const [user, setUser] = useState(null);
  const { userId } = useParams(); 

  useEffect(() => {
    const userPhotos = models.photoOfUserModel(userId);
    const userInfo = models.userModel(userId);
    setPhotos(userPhotos);
    setUser(userInfo);
  }, [userId]);

  let linkToAuthor;
  if (user) {
    linkToAuthor = (
      <Link to={`/users/${user._id}`}>
        {`${user.first_name} ${user.last_name}`}
      </Link>
    );
  } else {
    linkToAuthor = <p>Loading...</p>;
  }
  return photos ? (
    <Grid justifyContent="center" container spacing={3}>
      {photos.map((photo) => (
        <Grid item xs={6} key={photo._id}>
          <Card variant="outlined">
            <CardHeader
              title={linkToAuthor}
              subheader={photo.date_time}
              avatar={<Avatar style={{ backgroundColor: '#FF7F50' }}>A</Avatar>}
            />
            <CardMedia
              component="img"
              image={`../images/${photo.file_name}`}
              alt={photo.file_name}
            />
            <CardContent>
              {photo.comments && (
                <Typography variant="subtitle1">
                  Comments:
                  <Divider />
                </Typography>
              )}
              {photo.comments &&
                photo.comments.map((c) => (
                  <List key={c._id}>
                    <Typography variant="subtitle2">
                      <Link to={`/users/${c.user._id}`}>
                        {`${c.user.first_name} ${c.user.last_name}`}
                      </Link>
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      gutterBottom
                    >
                      {c.date_time}
                    </Typography>
                    <Typography variant="body1">
                      {`"${c.comment}"`}
                    </Typography>
                  </List>
                ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  ) : (
    <div>Loading...</div>
  );
};

export default UserPhotos;
