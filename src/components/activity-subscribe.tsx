import React from "react";
import { useForm } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

interface FormData {
    name: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

const ActivitySubscribe: React.FC = () => {
  const classes = useStyles();
  const { handleSubmit, register } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
      console.log(data);
  })

  return (
    <form
      onSubmit={onSubmit}
      className={classes.root}
      autoComplete="off"
    >
        <TextField
          required
          {...register("name")}
          label="Nom"
        />
      <Button variant="contained" color="primary" type="submit">ENVOYER</Button>
    </form>
  );
};

export default ActivitySubscribe;
