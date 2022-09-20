import "./BookDetailRating.scss";

import { CircularProgress, IconButton, Menu, MenuItem, Rating, Typography } from "@mui/material";
import { CompleteReview, ICreateReview } from "../../../utils/interfaces";
import { Favorite, FavoriteBorderOutlined, StarBorderOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";

import AlertBasic from "../../atoms/AlertBasic/AlertBasic";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import axios from "axios";
import { createReview } from "../../../redux/actions/reviewActions";
import { useAppSelector } from "../../../redux/hooks";

interface Props {
  id: number;
  rating: number;
  getBookDetail: (id: string) => void;
}

function BookDetailRating({ rating, id, getBookDetail }: Props) {
  const { loggedUser } = useAppSelector((state) => state.user);
  const [valuation, setValuation] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (loggedUser && Object.keys(loggedUser).length > 0) {
      const userReview = loggedUser.reviews?.find((r: CompleteReview) => r.bookId === id);
      if (userReview) setValuation(userReview.rating);
    }
  }, [id, loggedUser]);

  const handleToggleFavorite = async () => setFavorite(!favorite);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleValuation = async (num: number) => {
    setValuation(num);
    setLoading(true);

    const newReview: ICreateReview = { userId: loggedUser.id, bookId: id, rating: num };
    try {
      // TODO fijarme que tiene que quedar marcado por default la valuation si el user ya hizo review
      // TODO revisar cuando me registro y quiero votar
      await createReview(newReview);
      getBookDetail(id.toString());
    } catch (err) {
      if (axios.isAxiosError(err)) AlertBasic("Error", err.message, "error");
      else AlertBasic("Error", "Lo sentimos, no su pudo cargar su valoración", "error");
    }

    setLoading(false);
  };

  return (
    <section className="rating-favorite_book">
      <IconButton
        aria-label="Valorar"
        onClick={handleClick}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <StarBorderOutlined />
      </IconButton>
      <Menu
        elevation={4}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <MenuItem sx={{ display: "flex", flexDirection: "column" }}>
          {loggedUser && Object.keys(loggedUser).length > 0 ? (
            <>
              <Typography variant="body2">Que tanto le ha gustado este libro?</Typography>
              {!loading ? (
                <Rating
                  name="half-rating"
                  precision={0.5}
                  value={valuation}
                  onChange={(e, v) => handleValuation(v || 0)}
                />
              ) : (
                <CircularProgress size={20} />
              )}
            </>
          ) : (
            <Typography variant="body2">
              Debe <CustomLink to="/log_in" color="primary" text="iniciar sesión" variant="body2" />{" "}
              para poder valorar
            </Typography>
          )}
        </MenuItem>
      </Menu>
      <Typography variant="body1" sx={{ mr: "0.5rem" }}>
        Rating: {rating} / Comentarios: 99
      </Typography>
      <IconButton
        aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        onClick={handleToggleFavorite}
      >
        {favorite ? <Favorite color="error" /> : <FavoriteBorderOutlined />}
      </IconButton>
    </section>
  );
}

export default BookDetailRating;
