import "./BookDetailRating.scss";

import { CircularProgress, IconButton, Menu, MenuItem, Rating, Typography } from "@mui/material";
import { CompleteBook, CompleteReview, ICreateReview } from "../../../utils/interfaces";
import { Favorite, FavoriteBorderOutlined, StarBorderOutlined } from "@mui/icons-material";
import { FavoriteHook, UserHook } from "../../../utils/customHooks";
import { useEffect, useState } from "react";

import AlertBasic from "../../atoms/AlertBasic/AlertBasic";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import axios from "axios";
import { createReview } from "../../../redux/actions/reviewActions";

interface Props {
  book: CompleteBook;
  getBookDetail: (id: string) => void;
}

function BookDetailRating({ book, getBookDetail }: Props) {
  const { id, rating } = book;
  const { loggedUser, findLoggedUser, setLoggedUser } = UserHook();
  const { favorites, toFav, getFavoritesUser } = FavoriteHook();
  const [valuation, setValuation] = useState<number>(0);
  const [loading, setLoading] = useState({ rating: false, favorite: false });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    // si esta logueado y votó se lo agrego al render
    if (loggedUser && loggedUser.reviews) {
      const userReview = loggedUser.reviews.find((r: CompleteReview) => r.bookId === id);
      if (userReview) setValuation(userReview.rating);
    }
  }, [id, loggedUser]);

  const handleFavorite = async () => {
    if (!loggedUser?.id) return;

    setLoading({ ...loading, favorite: true });
    try {
      // agrego el favorito al user y me traigo los favoritos con la actualización
      await toFav(loggedUser.id, id);
      await getFavoritesUser(loggedUser.id);
    } catch (err) {}
    setLoading({ ...loading, favorite: false });
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleValuation = async (num: number) => {
    setValuation(num);
    setLoading({ ...loading, rating: true });

    const newReview: ICreateReview = { userId: loggedUser.id, bookId: id, rating: num };
    try {
      // TODO fijarme que tiene que quedar marcado por default la valuation si el user ya hizo review
      await createReview(newReview);
      getBookDetail(id.toString());
      const res = await findLoggedUser({ email: loggedUser.email, password: loggedUser.password });
      localStorage.setItem("lsLoggedUser", JSON.stringify(res));
      setLoggedUser(res);
    } catch (err) {
      if (axios.isAxiosError(err)) AlertBasic("Error", err.message, "error");
      else AlertBasic("Error", "Lo sentimos, no su pudo cargar su valoración", "error");
    }

    setLoading({ ...loading, rating: false });
  };

  const verifyIsFav = () => {
    const findFav = favorites.find((b: CompleteBook) => b.id === id);
    return findFav ? true : false;
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
              {!loading.rating ? (
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
      <Typography variant="body1" sx={{ mr: "1rem" }}>
        {rating.toFixed(1)}
      </Typography>

      <IconButton
        aria-label={verifyIsFav() ? "Quitar de favoritos" : "Agregar a favoritos"}
        onClick={handleFavorite}
        disabled={loading.favorite || !loggedUser?.id}
      >
        {verifyIsFav() ? <Favorite color="error" /> : <FavoriteBorderOutlined />}
      </IconButton>
    </section>
  );
}

export default BookDetailRating;
