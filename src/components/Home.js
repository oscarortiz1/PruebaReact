import React, { useEffect, useState } from "react";
import "firebase/auth";
import "firebase/firebase-database";
import {
  addCompetitor,
  handleUpload,
  getCompetitor,
} from "../Services/FirebaseData";
import { signOutUser } from "../Services/Auth";

export const Home = () => {
  const [competitor, setCompetitor] = useState("");
  const [scoreSetOne, setscoreSetOne] = useState("");
  const [scoreSetTwo, setscoreSetTwo] = useState("");
  const [scoreSetThree, setscoreSetThree] = useState("");
  const [scoreSetFour, setscoreSetFour] = useState("");
  const [scoreSetFive, setscoreSetFive] = useState("");
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const unsuscribe = getCompetitor((snapshots) => {
      const result = snapshots.docs.map((doc) => doc.data());
      setData(
        result.sort((a, b) => {
          if (a.score === b.score) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          } else {
            return b.score - a.score;
          }
        })
      );
    });
    return () => unsuscribe;
  }, []);

  const submit = async () => {
    const regexp = /[0-1]/g;
    const arrayOne = [...scoreSetOne.matchAll(regexp)];
    const arrayTwo = [...scoreSetTwo.matchAll(regexp)];
    const arrayThree = [...scoreSetThree.matchAll(regexp)];
    const arrayFour = [...scoreSetFour.matchAll(regexp)];
    const arrayFive = [...scoreSetFive.matchAll(regexp)];

    if (
      !scoreSetOne ||
      !scoreSetTwo ||
      !scoreSetThree ||
      !scoreSetFour ||
      !scoreSetFive ||
      arrayOne.length !== scoreSetOne.length ||
      arrayTwo.length !== scoreSetTwo.length ||
      arrayThree.length !== scoreSetThree.length ||
      arrayFour.length !== scoreSetFour.length ||
      arrayFive.length !== scoreSetFour.length ||
      image === null ||
      data.find((competitorRe) => competitorRe.name === competitor)
    ) {
      setAlert(
        "Datos invalidos"
      );
    } else {
      let score = 0;
      score += scoreSetOne.split("").reduce((prev, curr) => {
        if (curr === "1") {
          return prev + 1;
        } else {
          return prev;
        }
      }, 0);
      score += scoreSetTwo.split("").reduce((prev, curr) => {
        if (curr === "1") {
          return prev + 1;
        } else {
          return prev;
        }
      }, 0);
      score += scoreSetThree.split("").reduce((prev, curr) => {
        if (curr === "1") {
          return prev + 1;
        } else {
          return prev;
        }
      }, 0);
      score += scoreSetFour.split("").reduce((prev, curr) => {
        if (curr === "1") {
          return prev + 1;
        } else {
          return prev;
        }
      }, 0);
      score += scoreSetFive.split("").reduce((prev, curr) => {
        if (curr === "1") {
          return prev + 1;
        } else {
          return prev;
        }
      }, 0);

      await addCompetitor(
        competitor,
        scoreSetOne,
        scoreSetTwo,
        scoreSetThree,
        scoreSetFour,
        scoreSetFive,
        score
      );

      await handleUpload(image);

      setImage(undefined);
      setCompetitor("");
      setscoreSetOne("");
      setscoreSetTwo("");
      setscoreSetThree("");
      setscoreSetFour("");
      setscoreSetFive("");
      setAlert("");
    }
  };

  const signOut = async () => {
    signOutUser();
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form
      className="card card-body"
      style={{
        width: "80em",
        top: "10%",
        marginLeft: "15%",
        position: "absolute",
      }}
    >
      <div className="form-group">
        <h1 style={{ textAlign: "center " }}>Ingresar Participante:</h1>
        <br />
        <input
          type="text"
          className="form-control"
          maxlength="20"
          placeholder="Agregar Participante"
          id="competitor"
          class="form-control"
          onChange={(ev) =>
            setCompetitor(ev.target.value.replace(/[^A-Za-z]/gi, ""))
          }
          value={competitor}
        />
        <br />
        <h4 style={{ textAlign: "center " }}>Ingresa los sets:</h4>
        <table class="default">
          <tr>
            <td>
              <input
                type="numeric"
                name="pin"
                pattern="[0-1]"
                maxlength="5"
                placeholder="#####"
                id="scoreSetOne"
                class="form-control"
                style={{ width: "15em", textAlign: "center" }}
                onChange={(ev) => setscoreSetOne(ev.target.value)}
                value={scoreSetOne}
              />
            </td>
            <td>
              <input
                type="numeric"
                name="pin"
                pattern="[0-1]"
                maxlength="5"
                placeholder="#####"
                id="scoreSetTwo"
                class="form-control"
                style={{ width: "15em", textAlign: "center" }}
                onChange={(ev) => setscoreSetTwo(ev.target.value)}
                value={scoreSetTwo}
              />
            </td>
            <td>
              <input
                type="numeric"
                name="pin"
                pattern="[0-1]"
                maxlength="5"
                placeholder="#####"
                id="scoreSetThree"
                class="form-control"
                style={{ width: "15em", textAlign: "center" }}
                onChange={(ev) => setscoreSetThree(ev.target.value)}
                value={scoreSetThree}
              />
            </td>
            <td>
              <input
                type="numeric"
                name="pin"
                pattern="[0-1]"
                maxlength="5"
                placeholder="#####"
                id="scoreSetFour"
                class="form-control"
                style={{ width: "15em", textAlign: "center" }}
                onChange={(ev) => setscoreSetFour(ev.target.value)}
                value={scoreSetFour}
              />
            </td>
            <td>
              <input
                type="numeric"
                name="pin"
                pattern="[0-1]"
                maxlength="5"
                placeholder="#####"
                id="scoreSetFive"
                class="form-control"
                style={{ width: "15em", textAlign: "center" }}
                onChange={(ev) => setscoreSetFive(ev.target.value)}
                value={scoreSetFive}
              />
            </td>
          </tr>
        </table>
        {alert && <p class="text-danger"> {alert} </p>}
        <br />
        <input
          type="file"
          id="myFileInput"
          class="btn btn-outline-primary"
          onChange={handleChange}
        />
        <br />
        <br />
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Nombre Participante</th>
              <th scope="col">Puntaje Obtenido</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr class="table-secondary">
                  <td>{item.name}</td>
                  <td>{item.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <button
          type="button"
          class="btn btn-primary btn-lg btn-block"
          onClick={submit}
        >
          Agregar
        </button>
        <br />
        <button type="button" class="btn btn-danger" onClick={signOut}>
          Cerrar Sesion
        </button>
      </div>
    </form>
  );
};

export default Home;
