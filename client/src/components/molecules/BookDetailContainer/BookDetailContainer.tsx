import "./BookDetailContainer.scss";

import {
  Breadcrumbs,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Rating,
  Typography,
} from "@mui/material";
import {
  CompleteBook,
  CompleteReview,
  CompleteUser,
  ICreateReview,
} from "../../../utils/interfaces";
import { Favorite, FavoriteBorderOutlined, StarBorderOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";

import AlertBasic from "../../atoms/AlertBasic/AlertBasic";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import axios from "axios";
import { createReview } from "../../../redux/actions/reviewActions";
import { downloadBook } from "../../../redux/actions/bookActions";
import { useAppSelector } from "../../../redux/hooks";

interface Props {
  book: CompleteBook;
  getBookDetail: (id: string) => void;
}

// TODO modularizar este componente
function BookDetailContainer({ book, getBookDetail }: Props) {
  const { id, name, author, description, year, rating, image, categories, language } = book;
  const { loggedUser } = useAppSelector((state) => state.user);
  const [valuation, setValuation] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleValuation = async (num: number) => {
    setValuation(num);
    setLoading(true);

    const newReview: ICreateReview = { userId: loggedUser.id, bookId: id, rating: num };
    try {
      // TODO fijarme que tiene que quedar marcado por default la valuation si el user ya hizo review
      await createReview(newReview);
      getBookDetail(id.toString());
    } catch (err) {
      if (axios.isAxiosError(err)) AlertBasic("Error", err.message, "error");
      else AlertBasic("Error", "Lo sentimos, no su pudo cargar su valoración", "error");
    }

    setLoading(false);
  };
  const handleToggleFavorite = () => setFavorite(!favorite);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleDownload = () => downloadBook(name);

  useEffect(() => {
    console.log(book);
    console.log(loggedUser);
    if (loggedUser && Object.keys(loggedUser).length > 0) {
      const userReview: CompleteReview | undefined = loggedUser.reviews.find(
        (r: CompleteReview) => r.bookId === id
      );
      if (userReview) setValuation(userReview.rating);
    }
  }, [book, id, loggedUser]);

  return (
    <section className="book_detail">
      <Breadcrumbs aria-label="breadcrumb" sx={{ m: "1rem 0" }}>
        <CustomLink to="/" color="primary" text="Home" />
        <Typography color="text.secondary">{name}</Typography>
      </Breadcrumbs>

      <article className="article_container">
        <div style={{ backgroundImage: `url(${image})` }} className="img_detail"></div>
        <section className="details">
          <Typography variant="h4" component="h1">
            {name}
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: "italic", m: "1rem 0" }}>
            <CustomLink to="/" color="primary" text={author.name} />
          </Typography>
          <div className="rating-favorite">
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
                    Debe{" "}
                    <CustomLink
                      to="/log_in"
                      color="primary"
                      text="iniciar sesión"
                      variant="body2"
                    />{" "}
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
          </div>
          <Typography variant="body1" sx={{ m: "0.7rem 0 2rem 0" }}>
            {description}
          </Typography>

          <div className="more_details">
            <span>
              <Typography variant="body1" color="text.secondary" sx={{ mr: "0.5rem" }}>
                Categorías:
              </Typography>
              {categories.map((cat, i) =>
                i > 0 && i < categories.length ? " / " + cat.name : cat.name
              )}
            </span>
            <span>
              <Typography variant="body1" color="text.secondary" sx={{ mr: "0.5rem" }}>
                Año:
              </Typography>
              {year}
            </span>
            <span>
              <Typography variant="body1" color="text.secondary" sx={{ mr: "0.5rem" }}>
                Idioma:
              </Typography>
              {language}
            </span>
          </div>

          <Button variant="contained" size="small" onClick={handleDownload}>
            Descargar PDF
          </Button>
        </section>
      </article>
    </section>
  );
}

export default BookDetailContainer;
