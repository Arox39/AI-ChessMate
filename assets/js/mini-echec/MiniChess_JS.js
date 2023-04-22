function mini_chess() {
  var IA_checkmate, IsIAAbleToSave, IsPlayerAbleToSave, chess_board, chess_square_name, pat, player_checkmate;
  chess_square_name = [["5a", "5b", "5c", "5d", "5e"], ["4a", "4b", "4c", "4d", "4e"], ["3a", "3b", "3c", "3d", "3e"], ["2a", "2b", "2c", "2d", "2e"], ["1a", "1b", "1c", "1d", "1e"]];
  chess_board = [[0, 0, -3, -5, -255], [0, 0, 0, -9, -5], [3, 0, 0, 0, -3], [5, 9, 0, 0, 0], [255, 5, 3, 0, 0]];

  for (var i = 0, _pj_a = 5; i < _pj_a; i += 1) {
    console.log(chess_board[i]);
  }

  [IA_checkmate, player_checkmate, pat] = is_checkmate(chess_board, chess_square_name);
  /*IsIAAbleToSave et IsPlayerAbleToSave : indique si une position d'échec et mat peut etre évitée quand celle-ci est détéctée.
  Renvoient à la fonction AbleToBeSaved*/

  IsIAAbleToSave = true;
  IsPlayerAbleToSave = true;

  while (IA_checkmate === false && IsIAAbleToSave === true && player_checkmate === false && IsPlayerAbleToSave === true && pat === false) {
    new PlayerTurn(chess_board, chess_square_name);
    is_checkmate(chess_board, chess_square_name);

    if (IA_checkmate === true) {
      IsIAAbleToSave = new AbleToBeSaved(chess_board);
    }

    if (IA_checkmate === true && IsIAAbleToSave === false) {
      break;
    }

    is_checkmate(chess_board, chess_square_name);

    if (IA_checkmate === true) {
      IsIAAbleToSave = new AbleToBeSaved(chess_board);
    }
  }

  if (IA_checkmate === true) {
    console.log("Les blancs remportent la partie");
  } else {
    if (player_checkmate === true) {
      console.log("Les noirs remportent la partie");
    } else {
      if (pat === true) {
        console.log("Nul par pat");
      }
    }
  }
}

function AbleToBeSaved(chess_board) {
  var compteur, echec_IA, echec_Player, temp, x;

  for (var ligne = 0, _pj_a = 5; ligne < _pj_a; ligne += 1) {
    for (var colonne = 0, _pj_b = 5; colonne < _pj_b; colonne += 1) {
      if (chess_board[ligne][colonne] === 9) {
        compteur = 0;

        for (var i = 0, _pj_c = ligne; i < _pj_c; i += 1) {
          if (chess_board[ligne - i - 1][colonne] < 0) {
            compteur += 1;
          }

          temp = chess_board[ligne - i - 1][colonne];
          chess_board[ligne - i - 1][colonne] = 9;
          chess_board[ligne][colonne] = 0;
          echec_Player = verif_echec_Player();
          chess_board[ligne - i - 1][colonne] = temp;
          chess_board[ligne][colonne] = 9;

          if (chess_board[ligne - i - 1][colonne] > 0 || compteur > 1) {
            break;
          }

          if (echec_Player === 0) {
            return true;
          }

          if (chess_board[ligne + i + 1][colonne] < 0) {
            break;
          }
        }

        compteur = 0;

        for (var i = 0, _pj_c = 4 - ligne; i < _pj_c; i += 1) {
          if (chess_board[ligne + i + 1][colonne] < 0) {
            compteur += 1;
          }

          temp = chess_board[ligne + i + 1][colonne];
          chess_board[ligne + i + 1][colonne] = 9;
          chess_board[ligne][colonne] = 0;
          echec_Player = verif_echec_Player();
          chess_board[ligne + i + 1][colonne] = temp;
          chess_board[ligne][colonne] = 9;

          if (chess_board[ligne + i + 1][colonne] > 0 || compteur > 1) {
            break;
          }

          if (echec_Player === 0) {
            return true;
          }

          if (chess_board[ligne + i + 1][colonne] < 0) {
            break;
          }
        }

        compteur = 0;

        for (var i = 0, _pj_c = colonne; i < _pj_c; i += 1) {
          if (chess_board[ligne][colonne - i - 1] < 0) {
            compteur += 1;
          }

          temp = chess_board[ligne][colonne - i - 1];
          chess_board[ligne][colonne - i - 1] = 9;
          chess_board[ligne][colonne] = 0;
          echec_Player = verif_echec_Player();
          chess_board[ligne][colonne - i - 1] = temp;
          chess_board[ligne][colonne] = 9;

          if (chess_board[ligne][colonne - i - 1] > 0 || compteur > 1) {
            break;
          }

          if (echec_Player === 0) {
            return true;
          }

          if (chess_board[ligne][colonne - i - 1] < 0) {
            break;
          }
        }

        compteur = 0;

        for (var i = 0, _pj_c = 4 - colonne; i < _pj_c; i += 1) {
          temp = chess_board[ligne][colonne + i + 1];
          chess_board[ligne][colonne + i + 1] = 9;
          chess_board[ligne][colonne] = 0;
          echec_Player = verif_echec_Player();
          chess_board[ligne][colonne + i + 1] = temp;
          chess_board[ligne][colonne] = 9;

          if (chess_board[ligne][colonne + i + 1] > 0) {
            break;
          }

          if (echec_Player === 0) {
            return true;
          }

          if (chess_board[ligne][colonne + i + 1] < 0) {
            break;
          }
        }

        x = 0;

        while (ligne + x < 4 && colonne + x < 4) {
          x += 1;
          temp = chess_board[ligne + x][colonne + x];
          chess_board[ligne + x][colonne + x] = 9;
          chess_board[ligne][colonne] = 0;
          echec_Player = verif_echec_Player();
          chess_board[ligne + x][colonne + x] = temp;
          chess_board[ligne][colonne] = 9;

          if (chess_board[ligne + x][colonne + x] > 0) {
            break;
          }

          if (echec_Player === 0) {
            return true;
          }

          if (chess_board[ligne + x][colonne + x] < 0) {
            break;
          }
        }

        x = 0;

        while (ligne - x > 0 && colonne - x > 0) {
          x += 1;
          temp = chess_board[ligne - x][colonne - x];
          chess_board[ligne - x][colonne - x] = 9;
          chess_board[ligne][colonne] = 0;
          echec_Player = verif_echec_Player();
          chess_board[ligne - x][colonne - x] = temp;
          chess_board[ligne][colonne] = 9;

          if (chess_board[ligne - x][colonne - x] > 0) {
            break;
          }

          if (echec_Player === 0) {
            return true;
          }

          if (chess_board[ligne - x][colonne - x] < 0) {
            break;
          }
        }

        x = 0;

        while (ligne + x < 4 && colonne - x > 0) {
          x += 1;
          temp = chess_board[ligne + x][colonne - x];
          chess_board[ligne + x][colonne - x] = 9;
          chess_board[ligne][colonne] = 0;
          echec_Player = verif_echec_Player();
          chess_board[ligne + x][colonne - x] = temp;
          chess_board[ligne][colonne] = 9;

          if (chess_board[ligne + x][colonne - x] > 0) {
            break;
          }

          if (echec_Player === 0) {
            return true;
          }

          if (chess_board[ligne + x][colonne - x] < 0) {
            break;
          }
        }

        x = 0;

        while (ligne - x > 0 && colonne + x < 4) {
          x += 1;
          temp = chess_board[ligne - x][colonne + x];
          chess_board[ligne - x][colonne + x] = 9;
          chess_board[ligne][colonne] = 0;
          echec_Player = verif_echec_Player();
          chess_board[ligne - x][colonne + x] = temp;
          chess_board[ligne][colonne] = 9;

          if (chess_board[ligne - x][colonne + x] > 0) {
            break;
          }

          if (echec_Player === 0) {
            return true;
          }

          if (chess_board[ligne - x][colonne + x] < 0) {
            break;
          }
        }
      } else {
        if (chess_board[ligne][colonne] === 5) {
          compteur = 0;

          for (var i = 0, _pj_c = ligne; i < _pj_c; i += 1) {
            if (chess_board[ligne - i - 1][colonne] < 0) {
              compteur += 1;
            }

            temp = chess_board[ligne - i - 1][colonne];
            chess_board[ligne - i - 1][colonne] = 9;
            chess_board[ligne][colonne] = 0;
            echec_Player = verif_echec_Player();
            chess_board[ligne - i - 1][colonne] = temp;
            chess_board[ligne][colonne] = 9;

            if (chess_board[ligne - i - 1][colonne] > 0 || compteur > 1) {
              break;
            }

            if (echec_Player === 0) {
              return true;
            }

            if (chess_board[ligne + i + 1][colonne] < 0) {
              break;
            }
          }

          compteur = 0;

          for (var i = 0, _pj_c = 4 - ligne; i < _pj_c; i += 1) {
            if (chess_board[ligne + i + 1][colonne] < 0) {
              compteur += 1;
            }

            temp = chess_board[ligne + i + 1][colonne];
            chess_board[ligne + i + 1][colonne] = 9;
            chess_board[ligne][colonne] = 0;
            echec_Player = verif_echec_Player();
            chess_board[ligne + i + 1][colonne] = temp;
            chess_board[ligne][colonne] = 9;

            if (chess_board[ligne + i + 1][colonne] > 0 || compteur > 1) {
              break;
            }

            if (echec_Player === 0) {
              return true;
            }

            if (chess_board[ligne + i + 1][colonne] < 0) {
              break;
            }
          }

          compteur = 0;

          for (var i = 0, _pj_c = colonne; i < _pj_c; i += 1) {
            if (chess_board[ligne][colonne - i - 1] < 0) {
              compteur += 1;
            }

            temp = chess_board[ligne][colonne - i - 1];
            chess_board[ligne][colonne - i - 1] = 9;
            chess_board[ligne][colonne] = 0;
            echec_Player = verif_echec_Player();
            chess_board[ligne][colonne - i - 1] = temp;
            chess_board[ligne][colonne] = 9;

            if (chess_board[ligne][colonne - i - 1] > 0 || compteur > 1) {
              break;
            }

            if (echec_Player === 0) {
              return true;
            }

            if (chess_board[ligne][colonne - i - 1] < 0) {
              break;
            }
          }

          compteur = 0;

          for (var i = 0, _pj_c = 4 - colonne; i < _pj_c; i += 1) {
            temp = chess_board[ligne][colonne + i + 1];
            chess_board[ligne][colonne + i + 1] = 9;
            chess_board[ligne][colonne] = 0;
            echec_Player = verif_echec_Player();
            chess_board[ligne][colonne + i + 1] = temp;
            chess_board[ligne][colonne] = 9;

            if (chess_board[ligne][colonne + i + 1] > 0) {
              break;
            }

            if (echec_Player === 0) {
              return true;
            }

            if (chess_board[ligne][colonne + i + 1] < 0) {
              break;
            }
          }
        } else {
          if (chess_board[ligne][colonne] === 3) {
            x = 0;

            while (ligne + x < 4 && colonne + x < 4) {
              x += 1;
              temp = chess_board[ligne + x][colonne + x];
              chess_board[ligne + x][colonne + x] = 9;
              chess_board[ligne][colonne] = 0;
              echec_Player = verif_echec_Player();
              chess_board[ligne + x][colonne + x] = temp;
              chess_board[ligne][colonne] = 9;

              if (chess_board[ligne + x][colonne + x] > 0) {
                break;
              }

              if (echec_Player === 0) {
                return true;
              }

              if (chess_board[ligne + x][colonne + x] < 0) {
                break;
              }
            }

            x = 0;

            while (ligne - x > 0 && colonne - x > 0) {
              x += 1;
              temp = chess_board[ligne - x][colonne - x];
              chess_board[ligne - x][colonne - x] = 9;
              chess_board[ligne][colonne] = 0;
              echec_Player = verif_echec_Player();
              chess_board[ligne - x][colonne - x] = temp;
              chess_board[ligne][colonne] = 9;

              if (chess_board[ligne - x][colonne - x] > 0) {
                break;
              }

              if (echec_Player === 0) {
                return true;
              }

              if (chess_board[ligne - x][colonne - x] < 0) {
                break;
              }
            }

            x = 0;

            while (ligne + x < 4 && colonne - x > 0) {
              x += 1;
              temp = chess_board[ligne + x][colonne - x];
              chess_board[ligne + x][colonne - x] = 9;
              chess_board[ligne][colonne] = 0;
              echec_Player = verif_echec_Player();
              chess_board[ligne + x][colonne - x] = temp;
              chess_board[ligne][colonne] = 9;

              if (chess_board[ligne + x][colonne - x] > 0) {
                break;
              }

              if (echec_Player === 0) {
                return true;
              }

              if (chess_board[ligne + x][colonne - x] < 0) {
                break;
              }
            }

            x = 0;

            while (ligne - x > 0 && colonne + x < 4) {
              x += 1;
              temp = chess_board[ligne - x][colonne + x];
              chess_board[ligne - x][colonne + x] = 9;
              chess_board[ligne][colonne] = 0;
              echec_Player = verif_echec_Player();
              chess_board[ligne - x][colonne + x] = temp;
              chess_board[ligne][colonne] = 9;

              if (chess_board[ligne - x][colonne + x] > 0) {
                break;
              }

              if (echec_Player === 0) {
                return true;
              }

              if (chess_board[ligne - x][colonne + x] < 0) {
                break;
              }
            }
          }
        }
      }

      if (chess_board[ligne][colonne] === -9) {
        compteur = 0;

        for (var i = 0, _pj_c = ligne; i < _pj_c; i += 1) {
          if (chess_board[ligne - i - 1][colonne] < 0) {
            compteur += 1;
          }

          temp = chess_board[ligne - i - 1][colonne];
          chess_board[ligne - i - 1][colonne] = -9;
          chess_board[ligne][colonne] = 0;
          echec_IA = verif_echec_IA();
          chess_board[ligne - i - 1][colonne] = temp;
          chess_board[ligne][colonne] = -9;

          if (chess_board[ligne - i - 1][colonne] > 0 || compteur > 1) {
            break;
          }

          if (echec_IA === 0) {
            return true;
          }

          if (chess_board[ligne + i + 1][colonne] < 0) {
            break;
          }
        }

        compteur = 0;

        for (var i = 0, _pj_c = 4 - ligne; i < _pj_c; i += 1) {
          if (chess_board[ligne + i + 1][colonne] < 0) {
            compteur += 1;
          }

          temp = chess_board[ligne + i + 1][colonne];
          chess_board[ligne + i + 1][colonne] = -9;
          chess_board[ligne][colonne] = 0;
          echec_IA = verif_echec_IA();
          chess_board[ligne + i + 1][colonne] = temp;
          chess_board[ligne][colonne] = -9;

          if (chess_board[ligne + i + 1][colonne] > 0 || compteur > 1) {
            break;
          }

          if (echec_IA === 0) {
            return true;
          }

          if (chess_board[ligne + i + 1][colonne] < 0) {
            break;
          }
        }

        compteur = 0;

        for (var i = 0, _pj_c = colonne; i < _pj_c; i += 1) {
          if (chess_board[ligne][colonne - i - 1] < 0) {
            compteur += 1;
          }

          temp = chess_board[ligne][colonne - i - 1];
          chess_board[ligne][colonne - i - 1] = -9;
          chess_board[ligne][colonne] = 0;
          echec_IA = verif_echec_IA();
          chess_board[ligne][colonne - i - 1] = temp;
          chess_board[ligne][colonne] = -9;

          if (chess_board[ligne][colonne - i - 1] > 0 || compteur > 1) {
            break;
          }

          if (echec_IA === 0) {
            return true;
          }

          if (chess_board[ligne][colonne - i - 1] < 0) {
            break;
          }
        }

        compteur = 0;

        for (var i = 0, _pj_c = 4 - colonne; i < _pj_c; i += 1) {
          temp = chess_board[ligne][colonne + i + 1];
          chess_board[ligne][colonne + i + 1] = -9;
          chess_board[ligne][colonne] = 0;
          echec_IA = verif_echec_IA();
          chess_board[ligne][colonne + i + 1] = temp;
          chess_board[ligne][colonne] = -9;

          if (chess_board[ligne][colonne + i + 1] > 0) {
            break;
          }

          if (echec_IA === 0) {
            return true;
          }

          if (chess_board[ligne][colonne + i + 1] < 0) {
            break;
          }
        }

        x = 0;

        while (ligne + x < 4 && colonne + x < 4) {
          x += 1;
          temp = chess_board[ligne + x][colonne + x];
          chess_board[ligne + x][colonne + x] = -9;
          chess_board[ligne][colonne] = 0;
          echec_IA = verif_echec_IA();
          chess_board[ligne + x][colonne + x] = temp;
          chess_board[ligne][colonne] = -9;

          if (chess_board[ligne + x][colonne + x] > 0) {
            break;
          }

          if (echec_IA === 0) {
            return true;
          }

          if (chess_board[ligne + x][colonne + x] < 0) {
            break;
          }
        }

        x = 0;

        while (ligne - x > 0 && colonne - x > 0) {
          x += 1;
          temp = chess_board[ligne - x][colonne - x];
          chess_board[ligne - x][colonne - x] = -9;
          chess_board[ligne][colonne] = 0;
          echec_IA = verif_echec_IA();
          chess_board[ligne - x][colonne - x] = temp;
          chess_board[ligne][colonne] = -9;

          if (chess_board[ligne - x][colonne - x] > 0) {
            break;
          }

          if (echec_IA === 0) {
            return true;
          }

          if (chess_board[ligne - x][colonne - x] < 0) {
            break;
          }
        }

        x = 0;

        while (ligne + x < 4 && colonne - x > 0) {
          x += 1;
          temp = chess_board[ligne + x][colonne - x];
          chess_board[ligne + x][colonne - x] = -9;
          chess_board[ligne][colonne] = 0;
          echec_IA = verif_echec_IA();
          chess_board[ligne + x][colonne - x] = temp;
          chess_board[ligne][colonne] = -9;

          if (chess_board[ligne + x][colonne - x] > 0) {
            break;
          }

          if (echec_IA === 0) {
            return true;
          }

          if (chess_board[ligne + x][colonne - x] < 0) {
            break;
          }
        }

        x = 0;

        while (ligne - x > 0 && colonne + x < 4) {
          x += 1;
          temp = chess_board[ligne - x][colonne + x];
          chess_board[ligne - x][colonne + x] = -9;
          chess_board[ligne][colonne] = 0;
          echec_IA = verif_echec_IA();
          chess_board[ligne - x][colonne + x] = temp;
          chess_board[ligne][colonne] = -9;

          if (chess_board[ligne - x][colonne + x] > 0) {
            break;
          }

          if (echec_IA === 0) {
            return true;
          }

          if (chess_board[ligne - x][colonne + x] < 0) {
            break;
          }
        }
      } else {
        if (chess_board[ligne][colonne] === -5) {
          compteur = 0;

          for (var i = 0, _pj_c = ligne; i < _pj_c; i += 1) {
            if (chess_board[ligne - i - 1][colonne] < 0) {
              compteur += 1;
            }

            temp = chess_board[ligne - i - 1][colonne];
            chess_board[ligne - i - 1][colonne] = -5;
            chess_board[ligne][colonne] = 0;
            echec_IA = verif_echec_IA();
            chess_board[ligne - i - 1][colonne] = temp;
            chess_board[ligne][colonne] = -5;

            if (chess_board[ligne - i - 1][colonne] > 0 || compteur > 1) {
              break;
            }

            if (echec_IA === 0) {
              return true;
            }

            if (chess_board[ligne + i + 1][colonne] < 0) {
              break;
            }
          }

          compteur = 0;

          for (var i = 0, _pj_c = 4 - ligne; i < _pj_c; i += 1) {
            if (chess_board[ligne + i + 1][colonne] < 0) {
              compteur += 1;
            }

            temp = chess_board[ligne + i + 1][colonne];
            chess_board[ligne + i + 1][colonne] = -5;
            chess_board[ligne][colonne] = 0;
            echec_IA = verif_echec_IA();
            chess_board[ligne + i + 1][colonne] = temp;
            chess_board[ligne][colonne] = -5;

            if (chess_board[ligne + i + 1][colonne] > 0 || compteur > 1) {
              break;
            }

            if (echec_IA === 0) {
              return true;
            }

            if (chess_board[ligne + i + 1][colonne] < 0) {
              break;
            }
          }

          compteur = 0;

          for (var i = 0, _pj_c = colonne; i < _pj_c; i += 1) {
            if (chess_board[ligne][colonne - i - 1] < 0) {
              compteur += 1;
            }

            temp = chess_board[ligne][colonne - i - 1];
            chess_board[ligne][colonne - i - 1] = -5;
            chess_board[ligne][colonne] = 0;
            echec_IA = verif_echec_IA();
            chess_board[ligne][colonne - i - 1] = temp;
            chess_board[ligne][colonne] = -5;

            if (chess_board[ligne][colonne - i - 1] > 0 || compteur > 1) {
              break;
            }

            if (echec_IA === 0) {
              return true;
            }

            if (chess_board[ligne][colonne - i - 1] < 0) {
              break;
            }
          }

          compteur = 0;

          for (var i = 0, _pj_c = 4 - colonne; i < _pj_c; i += 1) {
            temp = chess_board[ligne][colonne + i + 1];
            chess_board[ligne][colonne + i + 1] = -5;
            chess_board[ligne][colonne] = 0;
            echec_IA = verif_echec_IA();
            chess_board[ligne][colonne + i + 1] = temp;
            chess_board[ligne][colonne] = -5;

            if (chess_board[ligne][colonne + i + 1] > 0) {
              break;
            }

            if (echec_IA === 0) {
              return true;
            }

            if (chess_board[ligne][colonne + i + 1] < 0) {
              break;
            }
          }
        } else {
          if (chess_board[ligne][colonne] === -3) {
            x = 0;

            while (ligne + x < 4 && colonne + x < 4) {
              x += 1;
              temp = chess_board[ligne + x][colonne + x];
              chess_board[ligne + x][colonne + x] = -3;
              chess_board[ligne][colonne] = 0;
              echec_IA = verif_echec_IA();
              chess_board[ligne + x][colonne + x] = temp;
              chess_board[ligne][colonne] = -3;

              if (chess_board[ligne + x][colonne + x] > 0) {
                break;
              }

              if (echec_IA === 0) {
                return true;
              }

              if (chess_board[ligne + x][colonne + x] < 0) {
                break;
              }
            }

            x = 0;

            while (ligne - x > 0 && colonne - x > 0) {
              x += 1;
              temp = chess_board[ligne - x][colonne - x];
              chess_board[ligne - x][colonne - x] = -3;
              chess_board[ligne][colonne] = 0;
              echec_IA = verif_echec_IA();
              chess_board[ligne - x][colonne - x] = temp;
              chess_board[ligne][colonne] = -3;

              if (chess_board[ligne - x][colonne - x] > 0) {
                break;
              }

              if (echec_IA === 0) {
                return true;
              }

              if (chess_board[ligne - x][colonne - x] < 0) {
                break;
              }
            }

            x = 0;

            while (ligne + x < 4 && colonne - x > 0) {
              x += 1;
              temp = chess_board[ligne + x][colonne - x];
              chess_board[ligne + x][colonne - x] = -3;
              chess_board[ligne][colonne] = 0;
              echec_IA = verif_echec_IA();
              chess_board[ligne + x][colonne - x] = temp;
              chess_board[ligne][colonne] = -3;

              if (chess_board[ligne + x][colonne - x] > 0) {
                break;
              }

              if (echec_IA === 0) {
                return true;
              }

              if (chess_board[ligne + x][colonne - x] < 0) {
                break;
              }
            }

            x = 0;

            while (ligne - x > 0 && colonne + x < 4) {
              x += 1;
              temp = chess_board[ligne - x][colonne + x];
              chess_board[ligne - x][colonne + x] = -3;
              chess_board[ligne][colonne] = 0;
              echec_IA = verif_echec_IA();
              chess_board[ligne - x][colonne + x] = temp;
              chess_board[ligne][colonne] = -3;

              if (chess_board[ligne - x][colonne + x] > 0) {
                break;
              }

              if (echec_IA === 0) {
                return true;
              }

              if (chess_board[ligne - x][colonne + x] < 0) {
                break;
              }
            }
          }
        }
      }
    }
  }
}

function KingPossibleMove(chess_board, chess_square_name) {
  var IA_KingPossibleMove, Move, Player_KingPossibleMove, op1, op2, op3, op4, op5, op6, op7, op8, pos_IA_King, pos_Player_King, x, y;
  IA_KingPossibleMove = [];
  Player_KingPossibleMove = [];

  for (var ligne = 0, _pj_a = 5; ligne < _pj_a; ligne += 1) {
    for (var colonne = 0, _pj_b = 5; colonne < _pj_b; colonne += 1) {
      if (abs(chess_board[ligne][colonne]) === 255) {
        x = ligne;
        y = colonne;

        if (x === 0 && y === 0) {
          op1 = "01";
          op2 = "11";
          op3 = "10";
          op4 = null;
          op5 = null;
          op6 = null;
          op7 = null;
          op8 = null;
        } else {
          if (x === 0 && y === 4) {
            op1 = "03";
            op2 = "13";
            op3 = "14";
            op4 = null;
            op5 = null;
            op6 = null;
            op7 = null;
            op8 = null;
          } else {
            if (x === 4 && y === 4) {
              op1 = "33";
              op2 = "43";
              op3 = "34";
              op4 = null;
              op5 = null;
              op6 = null;
              op7 = null;
              op8 = null;
            } else {
              if (x === 4 && y === 0) {
                op1 = "31";
                op2 = "30";
                op3 = "41";
                op4 = null;
                op5 = null;
                op6 = null;
                op7 = null;
                op8 = null;
              } else {
                if (x === 0 && y !== 0 && y !== 4) {
                  op1 = x.toString() + (y - 1).toString();
                  op2 = x.toString() + (y + 1).toString();
                  op3 = (x + 1).toString() + (y - 1).toString();
                  op4 = (x + 1).toString() + y.toString();
                  op5 = (x + 1).toString() + (y + 1).toString();
                  op6 = null;
                  op7 = null;
                  op8 = null;
                } else {
                  if (x === 4 && y !== 0 && y !== 4) {
                    op1 = x.toString() + (y - 1).toString();
                    op2 = x.toString() + (y + 1).toString();
                    op3 = (x - 1).toString() + (y - 1).toString();
                    op4 = (x - 1).toString() + y.toString();
                    op5 = (x - 1).toString() + (y + 1).toString();
                    op6 = null;
                    op7 = null;
                    op8 = null;
                  } else {
                    if (y === 0 && x !== 0 && x !== 4) {
                      op1 = y.toString() + (x - 1).toString();
                      op2 = y.toString() + (x + 1).toString();
                      op3 = (y + 1).toString() + (x - 1).toString();
                      op4 = (y + 1).toString() + x.toString();
                      op5 = (y + 1).toString() + (x + 1).toString();
                      op6 = null;
                      op7 = null;
                      op8 = null;
                    } else {
                      if (y === 4 && x !== 0 && x !== 4) {
                        op1 = y.toString() + (x - 1).toString();
                        op2 = y.toString() + (x + 1).toString();
                        op3 = (y - 1).toString() + (x - 1).toString();
                        op4 = (y - 1).toString() + x.toString();
                        op5 = (y - 1).toString() + (x + 1).toString();
                        op6 = null;
                        op7 = null;
                        op8 = null;
                      } else {
                        op1 = y.toString() + (x - 1).toString();
                        op2 = y.toString() + (x + 1).toString();
                        op3 = (y - 1).toString() + (x - 1).toString();
                        op4 = (y - 1).toString() + x.toString();
                        op5 = (y - 1).toString() + (x + 1).toString();
                        op6 = (y + 1).toString() + (x - 1).toString();
                        op7 = (y + 1).toString() + x.toString();
                        op8 = (y + 1).toString() + (x + 1).toString();
                      }
                    }
                  }
                }
              }
            }
          }
        }

        Move = [op1, op2, op3, op4, op5, op6, op7, op8];

        if (chess_board[ligne][colonne] === 255) {
          pos_Player_King = ligne.toString() + colonne.toString();

          for (var option, _pj_e = 0, _pj_c = Move, _pj_d = _pj_c.length; _pj_e < _pj_d; _pj_e += 1) {
            option = _pj_c[_pj_e];

            if (option !== null) {
              Player_KingPossibleMove.append(option);
            }
          }
        } else {
          if (chess_board[ligne][colonne] === -255) {
            pos_IA_King = ligne.toString() + colonne.toString();

            for (var option, _pj_e = 0, _pj_c = Move, _pj_d = _pj_c.length; _pj_e < _pj_d; _pj_e += 1) {
              option = _pj_c[_pj_e];

              if (option !== null) {
                IA_KingPossibleMove.append(option);
              }
            }
          }
        }
      }
    }
  }

  return [Player_KingPossibleMove, IA_KingPossibleMove, pos_Player_King, pos_IA_King];
}

function is_checkmate(chess_board, chess_square_name) {
  var IA_KingPossibleMove, IA_checkmate, Player_KingPossibleMove, a, compteur, coordonnée1, coordonnée2, echec_IA, echec_Player, pat, player_checkmate, pos_IA_King, pos_Player_King, pos_roi_1, pos_roi_2, temp;
  [Player_KingPossibleMove, IA_KingPossibleMove, pos_Player_King, pos_IA_King] = new KingPossibleMove(chess_board, chess_square_name);
  player_checkmate = false;
  IA_checkmate = false;
  pat = false;
  compteur = 0;
  a = 0;

  for (var value, _pj_c = 0, _pj_a = Player_KingPossibleMove, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    value = _pj_a[_pj_c];
    pos_roi_1 = Number.parseInt(pos_Player_King[0]);
    pos_roi_2 = Number.parseInt(pos_Player_King[1]);
    coordonnée1 = Number.parseInt(value[0]);
    coordonnée2 = Number.parseInt(value[1]);
    temp = chess_board[coordonnée1][coordonnée2];

    if (chess_board[coordonnée1][coordonnée2] <= 0) {
      chess_board[coordonnée1][coordonnée2] = 255;
      chess_board[pos_roi_1][pos_roi_2] = 0;
      echec_Player = verif_echec_Player(chess_board, chess_square_name);

      if (echec_Player === 0) {
        chess_board[coordonnée1][coordonnée2] = temp;
        chess_board[pos_roi_1][pos_roi_2] = 255;
        break;
      }

      compteur += 1;
    } else {
      a += 1;
    }

    chess_board[coordonnée1][coordonnée2] = temp;
    chess_board[pos_roi_1][pos_roi_2] = 255;
  }

  echec_Player = verif_echec_Player(chess_board, chess_square_name);

  if (compteur === Player_KingPossibleMove.length - a && echec_Player === 1) {
    player_checkmate = true;
  } else {
    if (compteur === Player_KingPossibleMove.length - a && echec_Player === 0 && Player_KingPossibleMove.length - a !== 0) {
      pat = true;
    }
  }

  compteur = 0;
  a = 0;

  for (var value, _pj_c = 0, _pj_a = IA_KingPossibleMove, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    value = _pj_a[_pj_c];
    pos_roi_1 = Number.parseInt(pos_IA_King[0]);
    pos_roi_2 = Number.parseInt(pos_IA_King[1]);
    coordonnée1 = Number.parseInt(value[0]);
    coordonnée2 = Number.parseInt(value[1]);
    temp = chess_board[coordonnée1][coordonnée2];

    if (chess_board[coordonnée1][coordonnée2] >= 0) {
      chess_board[coordonnée1][coordonnée2] = -255;
      chess_board[pos_roi_1][pos_roi_2] = 0;
      echec_IA = verif_echec_IA(chess_board, chess_square_name);

      if (echec_IA === 0) {
        chess_board[coordonnée1][coordonnée2] = temp;
        chess_board[pos_roi_1][pos_roi_2] = -255;
        break;
      }

      compteur += 1;
    } else {
      a += 1;
    }

    chess_board[coordonnée1][coordonnée2] = temp;
    chess_board[pos_roi_1][pos_roi_2] = -255;
  }

  echec_IA = verif_echec_IA(chess_board, chess_square_name);

  if (compteur === IA_KingPossibleMove.length - a && echec_IA === 1) {
    IA_checkmate = true;
  } else {
    if (compteur === IA_KingPossibleMove.length - a && echec_IA !== 1 && IA_KingPossibleMove.length - a !== 0) {
      pat = true;
    }
  }

  return [IA_checkmate, player_checkmate, pat];
}

function verif_echec_IA(chess_board, chess_square_name) {
  var echecIA, x;
  echecIA = 0;

  for (var ligne = 0, _pj_a = 5; ligne < _pj_a; ligne += 1) {
    for (var colonne = 0, _pj_b = 5; colonne < _pj_b; colonne += 1) {
      if (chess_board[ligne][colonne] === -255) {
        x = 0;

        for (var i = 0, _pj_c = 4 - ligne; i < _pj_c; i += 1) {
          x += 1;

          if (chess_board[ligne + x][colonne] !== 0 && chess_board[ligne + x][colonne] !== 9 && chess_board[ligne + x][colonne] !== 5) {
            break;
          }

          if (chess_board[ligne + x][colonne] === 9 || chess_board[ligne + x][colonne] === 5) {
            echecIA = 1;
            return echecIA;
          }
        }

        x = 0;

        for (var i = 0, _pj_c = ligne; i < _pj_c; i += 1) {
          x += 1;

          if (chess_board[ligne - x][colonne] !== 0 && chess_board[ligne - x][colonne] !== 9 && chess_board[ligne - x][colonne] !== 5) {
            break;
          }

          if (chess_board[ligne - x][colonne] === 9 || chess_board[ligne - x][colonne] === 5) {
            echecIA = 1;
            return echecIA;
          }
        }

        x = 0;

        for (var i = 0, _pj_c = 4 - colonne; i < _pj_c; i += 1) {
          x += 1;

          if (chess_board[ligne][colonne + x] !== 0 && chess_board[ligne][colonne + x] !== 9 && chess_board[ligne][colonne + x] !== 5) {
            break;
          }

          if (chess_board[ligne][colonne + x] === 9 || chess_board[ligne][colonne + x] === 5) {
            echecIA = 1;
            return echecIA;
          }
        }

        x = 0;

        for (var i = 0, _pj_c = colonne; i < _pj_c; i += 1) {
          x += 1;

          if (chess_board[ligne][colonne - x] !== 0 && chess_board[ligne][colonne - x] !== 9 && chess_board[ligne][colonne - x] !== 5) {
            break;
          }

          if (chess_board[ligne][colonne - x] === 9 || chess_board[ligne][colonne - x] === 5) {
            echecIA = 1;
            return echecIA;
          }
        }

        x = 0;

        while (ligne + x < 4 && colonne + x < 4) {
          x += 1;

          if (chess_board[ligne + x][colonne + x] !== 0 && chess_board[ligne + x][colonne + x] !== 9 && chess_board[ligne + x][colonne + x] !== 3) {
            break;
          }

          if (chess_board[ligne + x][colonne + x] === 9 || chess_board[ligne + x][colonne + x] === 3) {
            echecIA = 1;
            return echecIA;
          }
        }

        x = 0;

        while (ligne - x > 0 && colonne - x > 0) {
          x += 1;

          if (chess_board[ligne - x][colonne - x] !== 0 && chess_board[ligne - x][colonne - x] !== 9 && chess_board[ligne - x][colonne - x] !== 3) {
            break;
          }

          if (chess_board[ligne - x][colonne - x] === 9 || chess_board[ligne - x][colonne - x] === 3) {
            echecIA = 1;
            return echecIA;
          }
        }

        x = 0;

        while (ligne + x < 4 && colonne - x > 0) {
          x += 1;

          if (chess_board[ligne + x][colonne - x] !== 0 && chess_board[ligne + x][colonne - x] !== 9 && chess_board[ligne + x][colonne - x] !== 3) {
            break;
          }

          if (chess_board[ligne + x][colonne - x] === 9 || chess_board[ligne + x][colonne - x] === 3) {
            echecIA = 1;
            return echecIA;
          }
        }

        x = 0;

        while (ligne - x > 0 && colonne + x < 4) {
          x += 1;

          if (chess_board[ligne - x][colonne + x] !== 0 && chess_board[ligne - x][colonne + x] !== 9 && chess_board[ligne - x][colonne + x] !== 3) {
            break;
          }

          if (chess_board[ligne - x][colonne + x] === 9 || chess_board[ligne - x][colonne + x] === 3) {
            echecIA = 1;
            return echecIA;
          }
        }

        for (var ligne2 = 0, _pj_c = 5; ligne2 < _pj_c; ligne2 += 1) {
          for (var colonne2 = 0, _pj_d = 5; colonne2 < _pj_d; colonne2 += 1) {
            if (chess_board[ligne2][colonne2] === 255) {
              if (ligne2 === 4 && colonne2 === 4) {
                if (chess_board[ligne2 - 1][colonne2 - 1] === -255 || chess_board[ligne2 - 1][colonne2] === -255 || chess_board[ligne2][colonne2 - 1] === -255) {
                  echecIA = 1;
                  return echecIA;
                }
              } else {
                if (ligne2 === 0 && colonne2 === 0) {
                  if (chess_board[ligne2 + 1][colonne2 + 1] === -255 || chess_board[ligne2 + 1][colonne2] === -255 || chess_board[ligne2][colonne2 + 1] === -255) {
                    echecIA = 1;
                    return echecIA;
                  }
                } else {
                  if (ligne2 === 4 && colonne2 === 0) {
                    if (chess_board[ligne2 - 1][colonne2 + 1] === -255 || chess_board[ligne2 - 1][colonne2] === -255 || chess_board[ligne2][colonne2 + 1] === -255) {
                      echecIA = 1;
                      return echecIA;
                    }
                  } else {
                    if (ligne2 === 0 && colonne2 === 4) {
                      if (chess_board[ligne2 + 1][colonne2 - 1] === -255 || chess_board[ligne2][colonne2 - 1] === -255 || chess_board[ligne2 + 1][colonne2] === -255) {
                        echecIA = 1;
                        return echecIA;
                      }
                    } else {
                      if (ligne2 === 0 && colonne2 !== 0 && colonne2 !== 4) {
                        if (chess_board[ligne2 + 1][colonne2] === -255 || chess_board[ligne2 + 1][colonne2 - 1] === -255 || chess_board[ligne2 + 1][colonne2 + 1] === -255) {
                          echecIA = 1;
                          return echecIA;
                        } else {
                          if (chess_board[ligne2][colonne2] === -255 || chess_board[ligne2][colonne2 - 1] === -255 || chess_board[ligne2][colonne2 + 1] === -255) {
                            echecIA = 1;
                            return echecIA;
                          }
                        }
                      } else {
                        if (ligne2 === 4 && colonne2 !== 0 && colonne2 !== 4) {
                          if (chess_board[ligne2 - 1][colonne2] === -255 || chess_board[ligne2 - 1][colonne2 - 1] === -255 || chess_board[ligne2 - 1][colonne2 + 1] === -255) {
                            echecIA = 1;
                            return echecIA;
                          } else {
                            if (chess_board[ligne2][colonne2] === -255 || chess_board[ligne2][colonne2 - 1] === -255 || chess_board[ligne2][colonne2 + 1] === -255) {
                              echecIA = 1;
                              return echecIA;
                            }
                          }
                        } else {
                          if (colonne2 === 4 && ligne2 !== 0 && ligne2 !== 4) {
                            if (chess_board[ligne2][colonne2 - 1] === -255 || chess_board[ligne2 - 1][colonne2 - 1] === -255 || chess_board[ligne2 + 1][colonne2 - 1] === -255) {
                              echecIA = 1;
                              return echecIA;
                            } else {
                              if (chess_board[ligne2][colonne2] === -255 || chess_board[ligne2 - 1][colonne2] === -255 || chess_board[ligne2 + 1][colonne2] === -255) {
                                echecIA = 1;
                                return echecIA;
                              }
                            }
                          } else {
                            if (colonne2 === 0 && ligne2 !== 0 && ligne2 !== 4) {
                              if (chess_board[ligne2][colonne2 + 1] === -255 || chess_board[ligne2 - 1][colonne2 + 1] === -255 || chess_board[ligne2 + 1][colonne2 + 1] === -255) {
                                echecIA = 1;
                                return echecIA;
                              } else {
                                if (chess_board[ligne2][colonne2] === -255 || chess_board[ligne2 - 1][colonne2] === -255 || chess_board[ligne2 + 1][colonne2] === -255) {
                                  echecIA = 1;
                                  return echecIA;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return echecIA;
}

function verif_echec_Player(chess_board, chess_square_name) {
  var echecPlayer, x;
  echecPlayer = 0;

  for (var ligne = 0, _pj_a = 5; ligne < _pj_a; ligne += 1) {
    for (var colonne = 0, _pj_b = 5; colonne < _pj_b; colonne += 1) {
      if (chess_board[ligne][colonne] === 255) {
        x = 0;

        for (var i = 0, _pj_c = 4 - ligne; i < _pj_c; i += 1) {
          x += 1;

          if (chess_board[ligne + x][colonne] !== 0 && chess_board[ligne + x][colonne] !== -9 && chess_board[ligne + x][colonne] !== -5) {
            break;
          }

          if (chess_board[ligne + x][colonne] === -9 || chess_board[ligne + x][colonne] === -5) {
            echecPlayer = 1;
            return echecPlayer;
          }
        }

        x = 0;

        for (var i = 0, _pj_c = ligne; i < _pj_c; i += 1) {
          x += 1;

          if (chess_board[ligne - x][colonne] !== 0 && chess_board[ligne - x][colonne] !== -9 && chess_board[ligne - x][colonne] !== -5) {
            break;
          }

          if (chess_board[ligne - x][colonne] === -9 || chess_board[ligne - x][colonne] === -5) {
            echecPlayer = 1;
            return echecPlayer;
          }
        }

        x = 0;

        for (var i = 0, _pj_c = 4 - colonne; i < _pj_c; i += 1) {
          x += 1;

          if (chess_board[ligne][colonne + x] !== 0 && chess_board[ligne][colonne + x] !== -9 && chess_board[ligne][colonne + x] !== -5) {
            break;
          }

          if (chess_board[ligne][colonne + x] === -9 || chess_board[ligne][colonne + x] === -5) {
            echecPlayer = 1;
            return echecPlayer;
          }
        }

        x = 0;

        for (var i = 0, _pj_c = colonne; i < _pj_c; i += 1) {
          x += 1;

          if (chess_board[ligne][colonne - x] !== 0 && chess_board[ligne][colonne - x] !== -9 && chess_board[ligne][colonne - x] !== -5) {
            break;
          }

          if (chess_board[ligne][colonne - x] === -9 || chess_board[ligne][colonne - x] === -5) {
            echecPlayer = 1;
            return echecPlayer;
          }
        }

        x = 0;

        while (ligne + x < 4 && colonne + x < 4) {
          x += 1;

          if (chess_board[ligne + x][colonne + x] !== 0 && chess_board[ligne + x][colonne + x] !== -9 && chess_board[ligne + x][colonne + x] !== -3) {
            break;
          }

          if (chess_board[ligne + x][colonne + x] === -9 || chess_board[ligne + x][colonne + x] === -3) {
            echecPlayer = 1;
            return echecPlayer;
          }
        }

        x = 0;

        while (ligne - x > 0 && colonne - x > 0) {
          x += 1;

          if (chess_board[ligne - x][colonne - x] !== 0 && chess_board[ligne - x][colonne - x] !== -9 && chess_board[ligne - x][colonne - x] !== -3) {
            break;
          }

          if (chess_board[ligne - x][colonne - x] === -9 || chess_board[ligne - x][colonne - x] === -3) {
            echecPlayer = 1;
            return echecPlayer;
          }
        }

        x = 0;

        while (ligne + x < 4 && colonne - x > 0) {
          x += 1;

          if (chess_board[ligne + x][colonne - x] !== 0 && chess_board[ligne + x][colonne - x] !== -9 && chess_board[ligne + x][colonne - x] !== -3) {
            break;
          }

          if (chess_board[ligne + x][colonne - x] === -9 || chess_board[ligne + x][colonne - x] === -3) {
            echecPlayer = 1;
            return echecPlayer;
          }
        }

        x = 0;

        while (ligne - x > 0 && colonne + x < 4) {
          x += 1;

          if (chess_board[ligne - x][colonne + x] !== 0 && chess_board[ligne - x][colonne + x] !== -9 && chess_board[ligne - x][colonne + x] !== -3) {
            break;
          }

          if (chess_board[ligne - x][colonne + x] === -9 || chess_board[ligne - x][colonne + x] === -3) {
            echecPlayer = 1;
            return echecPlayer;
          }
        }

        for (var ligne2 = 0, _pj_c = 5; ligne2 < _pj_c; ligne2 += 1) {
          for (var colonne2 = 0, _pj_d = 5; colonne2 < _pj_d; colonne2 += 1) {
            if (chess_board[ligne2][colonne2] === -255) {
              if (ligne2 === 4 && colonne2 === 4) {
                if (chess_board[ligne2 - 1][colonne2 - 1] === 255 || chess_board[ligne2 - 1][colonne2] === 255 || chess_board[ligne2][colonne2 - 1] === 255) {
                  echecPlayer = 1;
                  return echecPlayer;
                }
              } else {
                if (ligne2 === 0 && colonne2 === 0) {
                  if (chess_board[ligne2 + 1][colonne2 + 1] === 255 || chess_board[ligne2 + 1][colonne2] === 255 || chess_board[ligne2][colonne2 + 1] === 255) {
                    echecPlayer = 1;
                    return echecPlayer;
                  }
                } else {
                  if (ligne2 === 4 && colonne2 === 0) {
                    if (chess_board[ligne2 - 1][colonne2 + 1] === 255 || chess_board[ligne2 - 1][colonne2] === 255 || chess_board[ligne2][colonne2 + 1] === 255) {
                      echecPlayer = 1;
                      return echecPlayer;
                    }
                  } else {
                    if (ligne2 === 0 && colonne2 === 4) {
                      if (chess_board[ligne2 + 1][colonne2 - 1] === 255 || chess_board[ligne2][colonne2 - 1] === 255 || chess_board[ligne2 + 1][colonne2] === 255) {
                        echecPlayer = 1;
                        return echecPlayer;
                      }
                    } else {
                      if (ligne2 === 0 && colonne2 !== 0 && colonne2 !== 4) {
                        if (chess_board[ligne2 + 1][colonne2] === 255 || chess_board[ligne2 + 1][colonne2 - 1] === 255 || chess_board[ligne2 + 1][colonne2 + 1] === 255) {
                          echecPlayer = 1;
                          return echecPlayer;
                        } else {
                          if (chess_board[ligne2][colonne2] === 255 || chess_board[ligne2][colonne2 - 1] === 255 || chess_board[ligne2][colonne2 + 1] === 255) {
                            echecPlayer = 1;
                            return echecPlayer;
                          }
                        }
                      } else {
                        if (ligne2 === 4 && colonne2 !== 0 && colonne2 !== 4) {
                          if (chess_board[ligne2 - 1][colonne2] === 255 || chess_board[ligne2 - 1][colonne2 - 1] === 255 || chess_board[ligne2 - 1][colonne2 + 1] === 255) {
                            echecPlayer = 1;
                            return echecPlayer;
                          } else {
                            if (chess_board[ligne2][colonne2] === 255 || chess_board[ligne2][colonne2 - 1] === 255 || chess_board[ligne2][colonne2 + 1] === 255) {
                              echecPlayer = 1;
                              return echecPlayer;
                            }
                          }
                        } else {
                          if (colonne2 === 4 && ligne2 !== 0 && ligne2 !== 4) {
                            if (chess_board[ligne2][colonne2 - 1] === 255 || chess_board[ligne2 - 1][colonne2 - 1] === 255 || chess_board[ligne2 + 1][colonne2 - 1] === 255) {
                              echecPlayer = 1;
                              return echecPlayer;
                            } else {
                              if (chess_board[ligne2][colonne2] === 255 || chess_board[ligne2 - 1][colonne2] === 255 || chess_board[ligne2 + 1][colonne2] === 255) {
                                echecPlayer = 1;
                                return echecPlayer;
                              }
                            }
                          } else {
                            if (colonne2 === 0 && ligne2 !== 0 && ligne2 !== 4) {
                              if (chess_board[ligne2][colonne2 + 1] === 255 || chess_board[ligne2 - 1][colonne2 + 1] === 255 || chess_board[ligne2 + 1][colonne2 + 1] === 255) {
                                echecPlayer = 1;
                                return echecPlayer;
                              } else {
                                if (chess_board[ligne2][colonne2] === 255 || chess_board[ligne2 - 1][colonne2] === 255 || chess_board[ligne2 + 1][colonne2] === 255) {
                                  echecPlayer = 1;
                                  return echecPlayer;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return echecPlayer;
}

function piece_pos_register(chess_board, chess_square_name, CaseDepart, CaseArrivee) {
  var IndexCaseArrivee, IndexCaseDepart, tempArr1, tempArr2, tempDep1, tempDep2;

  for (var ligne = 0, _pj_a = 5; ligne < _pj_a; ligne += 1) {
    for (var colonne = 0, _pj_b = 5; colonne < _pj_b; colonne += 1) {
      if (chess_square_name[ligne][colonne] === CaseDepart) {
        IndexCaseDepart = ligne.toString() + colonne.toString();
        tempDep1 = Number.parseInt(IndexCaseDepart[0]);
        tempDep2 = Number.parseInt(IndexCaseDepart[1]);
      } else {
        if (chess_square_name[ligne][colonne] === CaseArrivee) {
          IndexCaseArrivee = ligne.toString() + colonne.toString();
          tempArr1 = Number.parseInt(IndexCaseArrivee[0]);
          tempArr2 = Number.parseInt(IndexCaseArrivee[1]);
        }
      }
    }
  }

  return [tempDep1, tempDep2, tempArr1, tempArr2];
}

function KingMove(chess_board, chess_square_name, CaseDepart, CaseArrivee, tempDep1, tempDep2, tempArr1, tempArr2) {
  var verif_king;
  verif_king = 0;

  if (chess_board[tempDep1][tempDep2] !== 255) {
    return verif_king;
  }

  if (!(abs(tempDep1 - tempArr1) > 1) || !(abs(tempDep2 - tempArr2) > 1)) {
    verif_king = 1;
    return verif_king;
  } else {
    return verif_king;
  }
}

function QueenMove(chess_board, chess_square_name, CaseDepart, CaseArrivee, tempDep1, tempDep2, tempArr1, tempArr2) {
  var a, verif_queen;
  verif_queen = 0;
  a = 1;

  if (!(chess_board[tempDep1][tempDep2] === 9)) {
    return verif_queen;
  }

  if (tempDep1 === tempArr1 && tempDep2 !== tempArr2) {
    if (tempDep2 < tempArr2) {
      for (var i = 0, _pj_a = abs(tempDep2 - tempArr2); i < _pj_a; i += 1) {
        if (chess_board[tempDep1][tempDep2 + i + 1] !== 0 && chess_board[tempDep1][tempDep2 + i + 1] !== chess_board[tempArr1][tempArr2]) {
          return verif_queen;
        }
      }
    } else {
      if (tempDep2 > tempArr2) {
        for (var i = 0, _pj_a = abs(tempDep2 - tempArr2); i < _pj_a; i += 1) {
          if (chess_board[tempDep1][tempDep2 - i - 1] !== 0 && chess_board[tempDep1][tempDep2 - i - 1] !== chess_board[tempArr1][tempArr2]) {
            return verif_queen;
          }
        }
      }
    }
  } else {
    if (tempDep1 !== tempArr1 && tempDep2 === tempArr2) {
      if (tempDep1 < tempArr1) {
        for (var i = 0, _pj_a = abs(tempDep1 - tempArr1); i < _pj_a; i += 1) {
          if (chess_board[tempDep1 + i + 1][tempDep2] !== 0 && chess_board[tempDep1 + i + 1][tempDep2] !== chess_board[tempArr1][tempArr2]) {
            return verif_queen;
          }
        }
      } else {
        if (tempDep1 > tempArr1) {
          for (var i = 0, _pj_a = abs(tempDep1 - tempArr1); i < _pj_a; i += 1) {
            if (chess_board[tempDep1 - i - 1][tempDep2] !== 0 && chess_board[tempDep1 - i - 1][tempDep2] !== chess_board[tempArr1][tempArr2]) {
              return verif_queen;
            }
          }
        }
      }
    } else {
      if (tempDep1 !== tempArr1 && tempDep2 !== tempArr2) {
        if (tempDep1 > tempArr1 && tempDep2 < tempArr2) {
          while (chess_board[tempDep1 - a][tempDep2 + a] !== chess_board[tempArr1][tempArr2]) {
            if (chess_board[tempDep1 - a][tempDep2 + a] !== 0 && chess_board[tempDep1 - a][tempDep2 + a] !== chess_board[tempArr1][tempArr2]) {
              return verif_queen;
            }

            a += 1;
          }
        } else {
          if (tempDep1 > tempArr1 && tempDep2 > tempArr2) {
            while (chess_board[tempDep1 - a][tempDep2 - a] !== chess_board[tempArr1][tempArr2]) {
              if (chess_board[tempDep1 - a][tempDep2 - a] !== 0 && chess_board[tempDep1 - a][tempDep2 - a] !== chess_board[tempArr1][tempArr2]) {
                return verif_queen;
              }

              a += 1;
            }
          } else {
            if (tempDep1 < tempArr1 && tempDep2 < tempArr2) {
              while (chess_board[tempDep1 + a][tempDep2 + a] !== chess_board[tempArr1][tempArr2]) {
                if (chess_board[tempDep1 + a][tempDep2 + a] !== 0 && chess_board[tempDep1 + a][tempDep2 + a] !== chess_board[tempArr1][tempArr2]) {
                  return verif_queen;
                }

                a += 1;
              }
            } else {
              if (tempDep1 < tempArr1 && tempDep2 > tempArr2) {
                while (chess_board[tempDep1 + a][tempDep2 - a] !== chess_board[tempArr1][tempArr2]) {
                  if (chess_board[tempDep1 + a][tempDep2 - a] !== 0 && chess_board[tempDep1 + a][tempDep2 - a] !== chess_board[tempArr1][tempArr2]) {
                    return verif_queen;
                  }

                  a += 1;
                }
              }
            }
          }
        }
      }
    }
  }

  verif_queen = 1;
  return verif_queen;
}

function FoolMove(chess_board, chess_square_name, CaseDepart, CaseArrivee, tempDep1, tempDep2, tempArr1, tempArr2) {
  var a, verif_fool;
  verif_fool = 0;
  a = 1;

  if (!(chess_board[tempDep1][tempDep2] === 3)) {
    return verif_fool;
  }

  if (tempDep1 > tempArr1 && tempDep2 < tempArr2) {
    while (chess_board[tempDep1 - a][tempDep2 + a] !== chess_board[tempArr1][tempArr2]) {
      if (chess_board[tempDep1 - a][tempDep2 + a] !== 0 && chess_board[tempDep1 - a][tempDep2 + a] !== chess_board[tempArr1][tempArr2]) {
        return verif_fool;
      }

      a += 1;
    }
  } else {
    if (tempDep1 > tempArr1 && tempDep2 > tempArr2) {
      while (chess_board[tempDep1 - a][tempDep2 - a] !== chess_board[tempArr1][tempArr2]) {
        if (chess_board[tempDep1 - a][tempDep2 - a] !== 0 && chess_board[tempDep1 - a][tempDep2 - a] !== chess_board[tempArr1][tempArr2]) {
          return verif_fool;
        }

        a += 1;
      }
    } else {
      if (tempDep1 < tempArr1 && tempDep2 < tempArr2) {
        while (chess_board[tempDep1 + a][tempDep2 + a] !== chess_board[tempArr1][tempArr2]) {
          if (chess_board[tempDep1 + a][tempDep2 + a] !== 0 && chess_board[tempDep1 + a][tempDep2 + a] !== chess_board[tempArr1][tempArr2]) {
            return verif_fool;
          }

          a += 1;
        }
      } else {
        if (tempDep1 < tempArr1 && tempDep2 > tempArr2) {
          while (chess_board[tempDep1 + a][tempDep2 - a] !== chess_board[tempArr1][tempArr2]) {
            if (chess_board[tempDep1 + a][tempDep2 - a] !== 0 && chess_board[tempDep1 + a][tempDep2 - a] !== chess_board[tempArr1][tempArr2]) {
              return verif_fool;
            }

            a += 1;
          }
        } else {
          if (tempDep1 !== tempArr1 && tempDep2 === tempArr2 || tempDep1 === tempArr1 && tempDep2 === tempArr2 || tempDep1 === tempArr1 && tempDep2 !== tempArr2) {
            return verif_fool;
          }
        }
      }
    }
  }

  verif_fool = 1;
  return verif_fool;
}

function TourMove(chess_board, chess_square_name, CaseDepart, CaseArrivee, tempDep1, tempDep2, tempArr1, tempArr2) {
  var a, verif_tour;
  verif_tour = 0;
  a = 1;

  if (!(chess_board[tempDep1][tempDep2] === 5)) {
    return verif_tour;
  }

  if (tempDep1 === tempArr1 && tempDep2 !== tempArr2) {
    if (tempDep2 < tempArr2) {
      for (var i = 0, _pj_a = abs(tempDep2 - tempArr2); i < _pj_a; i += 1) {
        if (chess_board[tempDep1][tempDep2 + i + 1] !== 0 && chess_board[tempDep1][tempDep2 + i + 1] !== chess_board[tempArr1][tempArr2]) {
          return verif_tour;
        }
      }
    } else {
      if (tempDep2 > tempArr2) {
        for (var i = 0, _pj_a = abs(tempDep2 - tempArr2); i < _pj_a; i += 1) {
          if (chess_board[tempDep1][tempDep2 - i - 1] !== 0 && chess_board[tempDep1][tempDep2 - i - 1] !== chess_board[tempArr1][tempArr2]) {
            return verif_tour;
          }
        }
      }
    }
  } else {
    if (tempDep1 !== tempArr1 && tempDep2 === tempArr2) {
      if (tempDep1 < tempArr1) {
        for (var i = 0, _pj_a = abs(tempDep1 - tempArr1); i < _pj_a; i += 1) {
          if (chess_board[tempDep1 + i + 1][tempDep2] !== 0 && chess_board[tempDep1 + i + 1][tempDep2] !== chess_board[tempArr1][tempArr2]) {
            return verif_tour;
          }
        }
      }
    } else {
      if (tempDep1 !== tempArr1 && tempDep2 !== tempArr2) {
        return verif_tour;
      }
    }
  }

  verif_tour = 1;
  return verif_tour;
}

function select_move() {
  var CaseArrivee, CaseDepart;
  CaseDepart = input().toString();
  CaseArrivee = input().toString();
  return [CaseDepart, CaseArrivee];
}

function PlayerTurn(chess_board, chess_square_name) {
  var CaseArrivee, CaseDepart, echecPlayer, tempArr1, tempArr2, tempDep1, tempDep2, verif_fool, verif_king, verif_queen, verif_tour, y, z;
  [CaseDepart, CaseArrivee] = select_move();
  [tempDep1, tempDep2, tempArr1, tempArr2] = piece_pos_register(chess_board, chess_square_name, CaseDepart, CaseArrivee);

  if (chess_board[tempDep1][tempDep2] <= 0 || chess_board[tempArr1][tempArr2] > 0) {
    console.log("Vous ne pouvez d\u00e9placer que vos propres pions, vers des cases vides ou occup\u00e9es par des pions adverses, sans passer par des cases occup\u00e9es pas vos propres pions.");
    new PlayerTurn(chess_board, chess_square_name);
  }

  verif_queen = new QueenMove(chess_board, chess_square_name, CaseDepart, CaseArrivee, tempDep1, tempDep2, tempArr1, tempArr2);
  verif_king = new KingMove(chess_board, chess_square_name, CaseDepart, CaseArrivee, tempDep1, tempDep2, tempArr1, tempArr2);
  verif_fool = new FoolMove(chess_board, chess_square_name, CaseDepart, CaseArrivee, tempDep1, tempDep2, tempArr1, tempArr2);
  verif_tour = new TourMove(chess_board, chess_square_name, CaseDepart, CaseArrivee, tempDep1, tempDep2, tempArr1, tempArr2);

  if (verif_queen === 1 || verif_king === 1 || verif_fool === 1 || verif_tour === 1) {
    y = chess_board[tempDep1][tempDep2];
    z = chess_board[tempArr1][tempArr2];
    chess_board[tempArr1][tempArr2] = chess_board[tempDep1][tempDep2];
    chess_board[tempDep1][tempDep2] = 0;
    echecPlayer = verif_echec_Player(chess_board, chess_square_name);

    if (echecPlayer > 0) {
      chess_board[tempArr1][tempArr2] = z;
      chess_board[tempDep1][tempDep2] = y;
      console.log("Vous ne pouvez jouer un coup qui vous met en position d'echec");
      new PlayerTurn(chess_board, chess_square_name);
    } else {
      for (var i = 0, _pj_a = 5; i < _pj_a; i += 1) {
        console.log(chess_board[i]);
      }
    }
  }
}

mini_chess();
