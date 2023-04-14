################################################################################
#        PROJET 1-NSI: JEU D'ECHECS ET LES INTELLIGENCES ARTIFICIELLES         #
################################################################################





from math import*


def mouv_blanc(position_actu: list,ligne: int,colone: int,coup_precedant):

    '''
    parametre : liste qui represente une position(8*8),ligne et colone = [0;7] et une liste de 2 liste([ligne,colone] =[0;7]
    fonction qui retourne tout les coups du joueur(blanc)

    '''
    position_initial = [ligne,colone]
    coup = []
    piece = position_actu[ligne][colone]


    c0 = colone != 7    #-> condition que l'on rajoutera pour pas dépasser l'échecquier
    c7 = colone != 0
    l0 = ligne != 7
    l7 = ligne != 0

    #Pour le deplacement d'un  pion

    if piece == 1:     # -> pour les blancs


        if l7 and position_actu[ligne-1][colone] == 0  :     #->le pion peut avancer
            coup = coup + [position_initial,[ligne-1,colone]]


            if ligne == 6 and position_actu[4][colone] == 0: #->le pion peut avancer de 2 case(si pas de départ)
                coup = coup + [position_initial,[4,colone]]


        if l7 and c0 and position_actu[ligne-1][colone+1] < 0 :     #le pion mange une piece adverse en diagonal a droite
            coup = coup + [position_initial,[ligne-1,colone+1]]



        if l7 and c7 and position_actu[ligne-1][colone-1] < 0:   #le pion mange une piece adverse en diagonal a gauche
            coup = coup + [position_initial,[ligne-1,colone-1]]

        if ligne == 3 and colone >= 1 and coup_precedant == [[1,colone-1],[3,colone-1]] and position_actu[3][colone-1] == -1: #prise ne passant a gauche
            coup = coup + [position_initial,[-100,colone-1]]

        if ligne == 3 and colone <= 6 and coup_precedant == [[1,colone+1],[3,colone+1]] and position_actu[3][colone+1] == -1: #prise en passant a droite
            coup = coup + [position_initial,[100,colone+1]]



    #pour le fou
    elif piece == 3:
        nb = 1

        #pour savoir où peut aller le fou sur sa diagonal en haut a gauche
        while ligne - nb >=0 and colone - nb>=0:

            if position_actu[ligne-nb][colone-nb] <= 0 :     #->le fou peut avancer
                coup = coup + [position_initial,[ligne-nb,colone-nb]]

            if position_actu[ligne-nb][colone-nb] != 0 :
                break   #->On veux pas que le fou puisse avancer si elle a déja rencontrer une piece adverse

            nb = nb +1
        nb = 1
        #idem mais pour le bas a droite
        while ligne + nb <=7 and colone + nb <=7:

            if position_actu[ligne+nb][colone+nb] <= 0 :     #->le fou peut avancer
                coup = coup + [position_initial,[ligne+nb,colone+nb]]

            if position_actu[ligne+nb][colone+nb] != 0 :
                break   #->On veux pas que le fou puisse avancer si elle a déja rencontrer une piece adverse
            nb = nb +1



        #idem pour les deux autres diagonales
        nb = 1
        #pour en bas a droite
        while colone - nb >=0 and ligne + nb <=7:

            if position_actu[ligne+nb][colone-nb] <= 0 :     #->le fou peut avancer
                coup = coup + [position_initial,[ligne+nb,colone-nb]]

            if position_actu[ligne+nb][colone-nb] != 0 :
                break   #->On veux pas que le fou puisse avancer si elle a déja rencontrer une piece adverse
            nb = nb +1


        nb = 1
        #pour en haut a gauche
        while colone + nb <=7 and ligne-nb >=0 :

            if position_actu[ligne-nb][colone+nb] <= 0 :     #->le fou peut avancer
                coup = coup + [position_initial,[ligne-nb,colone+nb]]
            if position_actu[ligne-nb][colone+nb] != 0 :
                break   #->On veux pas que le fou puisse avancer si elle a déja rencontrer une piece adverse

            nb = nb +1

    #pour la reine
    elif piece == 9:
        nb = 1

        #pour savoir où peut aller le fou sur sa diagonal en haut a gauche
        while ligne - nb >=0 and colone - nb>=0:

            if position_actu[ligne-nb][colone-nb] <= 0 :     #->le fou peut avancer
                coup = coup + [position_initial,[ligne-nb,colone-nb]]

            if position_actu[ligne-nb][colone-nb] != 0 :
                break   #->On veux pas que le fou puisse avancer si elle a déja rencontrer une piece adverse

            nb = nb +1
        nb = 1
        #idem mais pour le bas a droite
        while ligne + nb <=7 and colone + nb <=7:

            if position_actu[ligne+nb][colone+nb] <= 0 :     #->le fou peut avancer
                coup = coup + [position_initial,[ligne+nb,colone+nb]]

            if position_actu[ligne+nb][colone+nb] != 0 :
                break   #->On veux pas que le fou puisse avancer si elle a déja rencontrer une piece adverse
            nb = nb +1



        #idem pour les deux autres diagonales
        nb = 1
        #pour en bas a droite
        while colone - nb >=0 and ligne + nb <=7:

            if position_actu[ligne+nb][colone-nb] <= 0 :     #->le fou peut avancer
                coup = coup + [position_initial,[ligne+nb,colone-nb]]

            if position_actu[ligne+nb][colone-nb] != 0 :
                break   #->On veux pas que le fou puisse avancer si elle a déja rencontrer une piece adverse
            nb = nb +1


        nb = 1
        #pour en haut a gauche
        while colone + nb <=7 and ligne-nb >=0 :

            if position_actu[ligne-nb][colone+nb] <= 0 :     #->le fou peut avancer
                coup = coup + [position_initial,[ligne-nb,colone+nb]]
            if position_actu[ligne-nb][colone+nb] != 0 :
                break   #->On veux pas que le fou puisse avancer si elle a déja rencontrer une piece adverse

            nb = nb +1

        nb = 1

        #pour savoir où peut aller la reine sur sa colone
        while ligne - nb >=0:

            if position_actu[ligne-nb][colone] <= 0 :     #->la reine peut avancer
                coup = coup + [position_initial,[ligne-nb,colone]]

            if position_actu[ligne-nb][colone] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece adverse

            nb = nb +1
        nb = 1
        while ligne + nb <=7:

            if position_actu[ligne+nb][colone] <= 0 :     #->la tour peut avancer
                coup = coup + [position_initial,[ligne+nb,colone]]

            if position_actu[ligne+nb][colone] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece adverse
            nb = nb +1



        #Pour savoir où peut aller la reine sur sa ligne
        nb = 1
        while colone - nb >=0:

            if position_actu[ligne][colone-nb] <= 0 :     #->la reine peut avancer
                coup = coup + [position_initial,[ligne,colone-nb]]

            if position_actu[ligne][colone-nb] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece adverse
            nb = nb +1

        nb = 1
        while colone + nb <=7:

            if position_actu[ligne][colone+nb] <= 0 :     #->la reine peut avancer
                coup = coup + [position_initial,[ligne,colone+nb]]
            if position_actu[ligne][colone+nb] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece adverse

            nb = nb +1





    #pour le cavalier
    elif piece == 8:
        if ligne >1 and colone !=7 and position_actu[ligne-2][colone+1] <= 0 :   #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne-2,colone+1]]

        if ligne >1 and colone !=0 and position_actu[ligne-2][colone-1] <= 0 :  #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne-2,colone-1]]

        if ligne <6 and colone !=7 and position_actu[ligne+2][colone+1] <= 0 :   #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne+2,colone+1]]

        if ligne <6 and colone !=0 and position_actu[ligne+2][colone-1] <= 0 :  #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne+2,colone-1]]


        if ligne != 0 and colone <6 and position_actu[ligne-1][colone+2] <= 0 :  #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne-1,colone+2]]

        if ligne != 0 and colone >1 and position_actu[ligne-1][colone-2] <= 0 :  #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne-1,colone-2]]

        if ligne != 7 and colone <6 and position_actu[ligne+1][colone+2] <= 0 :  #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne+1,colone+2]]

        if  ligne != 7 and colone >1 and position_actu[ligne+1][colone-2] <= 0 :  #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne+1,colone-2]]


    #Pour le roi
    elif piece == 255:

        if l7 and position_actu[ligne-1][colone] <= 0  :     #->le roi peut avancer / manger la piece adverse
            coup = coup + [position_initial,[ligne-1,colone]]

        if l0 and position_actu[ligne+1][colone] <= 0  :     #->le roi peut reculer / manger la piece adverse
            coup = coup + [position_initial,[ligne+1,colone]]

        if l7 and c0 and position_actu[ligne-1][colone+1] <= 0  :    #le roi peut avancer /(manger une piece adverse) en diagonal droit
            coup = coup + [position_initial,[ligne-1,colone+1]]

        if l0 and c0 and  position_actu[ligne+1][colone+1] <= 0 :    #le roi peut reculer /(manger une piece adverse) en diagonal droit
             coup = coup + [position_initial,[ligne+1,colone+1]]


        if c0 and position_actu[ligne][colone+1] <= 0 :      #le roi peut se deplacer/(manger une piece adverse) a droit
            coup = coup + [position_initial,[ligne,colone+1]]

        if l7 and c7 and position_actu[ligne-1][colone-1] <= 0 :    #le roi peut avancer/(manger une piece adverse) en diagonal gauche
            coup = coup + [position_initial,[ligne-1,colone-1]]

        if l0 and c7 and position_actu[ligne+1][colone-1] <= 0 :    #le roi peut reculer/(manger une piece adverse) en diagonal gauche
            coup = coup + [position_initial,[ligne+1,colone-1]]


        if c7 and position_actu[ligne][colone-1] <= 0:      #le roi peut se deplacer/(manger une piece adverse) a gauche
            coup = coup + [position_initial,[ligne,colone-1]]

    #Pour une tour
    elif piece == 5:
        nb = 1

        #pour savoir où peut aller la tour sur sa colone
        while ligne - nb >=0:

            if position_actu[ligne-nb][colone] <= 0 :     #->la tour peut avancer
                coup = coup + [position_initial,[ligne-nb,colone]]

            if position_actu[ligne-nb][colone] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece adverse

            nb = nb +1
        nb = 1
        while ligne + nb <=7:

            if position_actu[ligne+nb][colone] <= 0 :     #->la tour peut avancer
                coup = coup + [position_initial,[ligne+nb,colone]]

            if position_actu[ligne+nb][colone] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece adverse
            nb = nb +1



        #Pour savoir où peut aller la tour sur sa ligne
        nb = 1
        while colone - nb >=0:

            if position_actu[ligne][colone-nb] <= 0 :     #->la tour peut avancer
                coup = coup + [position_initial,[ligne,colone-nb]]

            if position_actu[ligne][colone-nb] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece adverse
            nb = nb +1

        nb = 1
        while colone + nb <=7:

            if position_actu[ligne][colone+nb] <= 0 :     #->la tour peut avancer
                coup = coup + [position_initial,[ligne,colone+nb]]
            if position_actu[ligne][colone+nb] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece adverse

            nb = nb +1

    return coup

def mouv_noir(position_actu: list,ligne: int,colone: int,coup_precedant):

    '''
    parametre : liste qui represente une position(8*8),ligne et colone = [0;7] et une liste de 2 liste([ligne,colone] =[0;7]
    fonction qui retourne tout les coups du joueur(blanc)


    '''
    position_initial = [ligne,colone]
    coup = []
    piece = position_actu[ligne][colone]


    c0 = colone != 7    #-> condition que l'on rajoutera pour pas dépasser l'échecquier
    c7 = colone != 0
    l0 = ligne != 7
    l7 = ligne != 0

    #Pour le deplacement d'un  pion

    if piece == -1:     #-> pour les noir


        if l0 and position_actu[ligne+1][colone] == 0  :     #->le pion peut avancer
            coup = coup + [position_initial,[ligne+1,colone]]


            if ligne == 1 and position_actu[3][colone] == 0: #->le pion peut avancer de 2 case(si pos de départ
                coup = coup + [position_initial,[3,colone]]


        if l0 and c0 and position_actu[ligne+1][colone+1] > 0 :     #le pion mange une piece adverse en diagonal a droite
            coup = coup + [position_initial,[ligne+1,colone+1]]



        if l0 and c7 and position_actu[ligne+1][colone-1] > 0:   #le pion mange une piece adverse en diagonal a gauche
            coup = coup + [position_initial,[ligne+1,colone-1]]

        if ligne == 4 and colone >= 1 and coup_precedant == [[1,colone-1],[4,colone-1]] and position_actu[4][colone-1] == 1: #prise ne passant a gauche
            coup = coup + [position_initial,[-100,colone-1]]

        if ligne == 4 and colone <= 6 and coup_precedant == [[1,colone+1],[4,colone+1]] and position_actu[4][colone+1] == 1: #prise en passant a droite
            coup = coup + [position_initial,[100,colone+1]]



    #pour le fou
    elif piece == -3:
        nb = 1

        #pour savoir où peut aller le fou sur sa diagonal en haut a gauche
        while ligne - nb >=0 and colone - nb>=0:

            if position_actu[ligne-nb][colone-nb] >= 0 :     #->le fou peut avancer
                coup = coup + [position_initial,[ligne-nb,colone-nb]]

            if position_actu[ligne-nb][colone-nb] != 0 :
                break   #->On veux pas que le fou puisse avancer si elle a déja rencontrer une piece adverse

            nb = nb +1
        nb = 1
        #idem mais pour le bas a droite
        while ligne + nb <=7 and colone + nb <=7:

            if position_actu[ligne+nb][colone+nb] >= 0 :     #->le fou peut avancer
                coup = coup + [position_initial,[ligne+nb,colone+nb]]

            if position_actu[ligne+nb][colone+nb] != 0 :
                break   #->On veux pas que le fou puisse avancer si elle a déja rencontrer une piece adverse
            nb = nb +1



        #idem pour les deux autres diagonales
        nb = 1
        #pour en bas a droite
        while colone - nb >=0 and ligne + nb <=7:

            if position_actu[ligne+nb][colone-nb] >= 0 :     #->le fou peut avancer
                coup = coup + [position_initial,[ligne+nb,colone-nb]]

            if position_actu[ligne+nb][colone-nb] != 0 :
                break   #->On veux pas que le fou puisse avancer si elle a déja rencontrer une piece adverse
            nb = nb +1


        nb = 1
        #pour en haut a gauche
        while colone + nb <=7 and ligne-nb >=0 :

            if position_actu[ligne-nb][colone+nb] >= 0 :     #->le fou peut avancer
                coup = coup + [position_initial,[ligne-nb,colone+nb]]
            if position_actu[ligne-nb][colone+nb] != 0 :
                break   #->On veux pas que le fou puisse avancer si elle a déja rencontrer une piece adverse

            nb = nb +1

    #pour la reine
    elif piece == -9:
        nb = 1

        #pour savoir où peut aller le fou sur sa diagonal en haut a gauche
        while ligne - nb >=0 and colone - nb>=0:

            if position_actu[ligne-nb][colone-nb] >= 0 :     #->la reine peut avancer
                coup = coup + [position_initial,[ligne-nb,colone-nb]]

            if position_actu[ligne-nb][colone-nb] != 0 :
                break   #->On veux pas que la reine puisse avancer si elle a déja rencontrer une piece adverse

            nb = nb +1
        nb = 1
        #idem mais pour le bas a droite
        while ligne + nb <=7 and colone + nb <=7:

            if position_actu[ligne+nb][colone+nb] >= 0 :     #->la reine peut avancer
                coup = coup + [position_initial,[ligne+nb,colone+nb]]

            if position_actu[ligne+nb][colone+nb] != 0 :
                break   #->On veux pas que la reine puisse avancer si elle a déja rencontrer une piece adverse
            nb = nb +1



        #idem pour les deux autres diagonales
        nb = 1
        #pour en bas a droite
        while colone - nb >=0 and ligne + nb <=7:

            if position_actu[ligne+nb][colone-nb] >= 0 :     #->la reine peut avancer
                coup = coup + [position_initial,[ligne+nb,colone-nb]]

            if position_actu[ligne+nb][colone-nb] != 0 :
                break   #->On veux pas que le fou puisse avancer si elle a déja rencontrer une piece adverse
            nb = nb +1


        nb = 1
        #pour en haut a gauche
        while colone + nb <=7 and ligne-nb >=0 :

            if position_actu[ligne-nb][colone+nb] >= 0 :     #->la reine peut avancer
                coup = coup + [position_initial,[ligne-nb,colone+nb]]
            if position_actu[ligne-nb][colone+nb] != 0 :
                break   #->On veux pas que la reine puisse avancer si elle a déja rencontrer une piece adverse

            nb = nb +1

        nb = 1

        #pour savoir où peut aller la reine sur sa colone
        while ligne - nb >=0:

            if position_actu[ligne-nb][colone] >= 0 :     #->la reine peut avancer
                coup = coup + [position_initial,[ligne-nb,colone]]

            if position_actu[ligne-nb][colone] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece adverse

            nb = nb +1
        nb = 1
        while ligne + nb <=7:

            if position_actu[ligne+nb][colone] >= 0 :     #->la reine peut avancer
                coup = coup + [position_initial,[ligne+nb,colone]]

            if position_actu[ligne+nb][colone] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece adverse
            nb = nb +1



        #Pour savoir où peut aller la reine sur sa ligne
        nb = 1
        while colone - nb >=0:

            if position_actu[ligne][colone-nb] >= 0 :     #->la reine peut avancer
                coup = coup + [position_initial,[ligne,colone-nb]]

            if position_actu[ligne][colone-nb] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece adverse
            nb = nb +1

        nb = 1
        while colone + nb <=7:

            if position_actu[ligne][colone+nb] >= 0 :     #->la reine peut avancer
                coup = coup + [position_initial,[ligne,colone+nb]]
            if position_actu[ligne][colone+nb] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece adverse

            nb = nb +1





    #pour le cavalier
    elif piece == -8:
        if ligne >1 and colone !=7 and position_actu[ligne-2][colone+1] >= 0 :   #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne-2,colone+1]]

        if ligne >1 and colone !=0 and position_actu[ligne-2][colone-1] >= 0 :  #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne-2,colone-1]]

        if ligne <6 and colone !=7 and position_actu[ligne+2][colone+1] >= 0 :   #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne+2,colone+1]]

        if ligne <6 and colone !=0 and position_actu[ligne+2][colone-1] >= 0 :  #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne+2,colone-1]]


        if ligne != 0 and colone <6 and position_actu[ligne-1][colone+2] >= 0 :  #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne-1,colone+2]]

        if ligne != 0 and colone >1 and position_actu[ligne-1][colone-2] >= 0 :  #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne-1,colone-2]]

        if ligne != 7 and colone <6 and position_actu[ligne+1][colone+2] >= 0 :  #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne+1,colone+2]]

        if  ligne != 7 and colone >1 and position_actu[ligne+1][colone-2] >= 0 :  #Deplacement en L du cavalier en ne depassant pasv l'échecquier
            coup = coup + [position_initial,[ligne+1,colone-2]]


    #Pour le roi
    elif piece == -255:

        if l7 and position_actu[ligne-1][colone] >= 0  :     #->le roi peut avancer / manger la piece adverse
            coup = coup + [position_initial,[ligne-1,colone]]

        if l0 and position_actu[ligne+1][colone] >= 0  :     #->le roi peut reculer / manger la piece adverse
            coup = coup + [position_initial,[ligne+1,colone]]

        if l7 and c0 and position_actu[ligne-1][colone+1] >= 0  :    #le roi peut avancer /(manger une piece adverse) en diagonal droit
            coup = coup + [position_initial,[ligne-1,colone+1]]

        if l0 and c0 and  position_actu[ligne+1][colone+1] >= 0 :    #le roi peut reculer /(manger une piece adverse) en diagonal droit
             coup = coup + [position_initial,[ligne+1,colone+1]]


        if c0 and position_actu[ligne][colone+1] >= 0 :      #le roi peut se deplacer/(manger une piece adverse) a droit
            coup = coup + [position_initial,[ligne,colone+1]]

        if l7 and c7 and position_actu[ligne-1][colone-1] >= 0 :    #le roi peut avancer/(manger une piece adverse) en diagonal gauche
            coup = coup + [position_initial,[ligne-1,colone-1]]

        if l0 and c7 and position_actu[ligne+1][colone-1] >= 0 :    #le roi peut reculer/(manger une piece adverse) en diagonal gauche
            coup = coup + [position_initial,[ligne+1,colone-1]]


        if c7 and position_actu[ligne][colone-1] >= 0:      #le roi peut se deplacer/(manger une piece adverse) a gauche
            coup = coup + [position_initial,[ligne,colone-1]]

    #Pour une tour
    elif piece == -5:
        nb = 1

        #pour savoir où peut aller la tour sur sa colone
        while ligne - nb >=0:

            if position_actu[ligne-nb][colone] >= 0 :     #->la tour peut avancer
                coup = coup + [position_initial,[ligne-nb,colone]]

            if position_actu[ligne-nb][colone] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece

            nb = nb +1
        nb = 1
        while ligne + nb <=7:

            if position_actu[ligne+nb][colone] >= 0 :     #->la tour peut avancer
                coup = coup + [position_initial,[ligne+nb,colone]]

            if position_actu[ligne+nb][colone] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece
            nb = nb +1



        #Pour savoir où peut aller la tour sur sa ligne
        nb = 1
        while colone - nb >=0:

            if position_actu[ligne][colone-nb] >= 0 :     #->la tour peut avancer
                coup = coup + [position_initial,[ligne,colone-nb]]

            if position_actu[ligne][colone-nb] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece adverse
            nb = nb +1

        nb = 1
        while colone + nb <=7:

            if position_actu[ligne][colone+nb] >= 0 :     #->la tour peut avancer
                coup = coup + [position_initial,[ligne,colone+nb]]
            if position_actu[ligne][colone+nb] != 0 :
                break   #->On veux pas que la tour puisse avancer si elle a déja rencontrer une piece adverse

            nb = nb +1




    return coup

def echec_roi_blanc(plateau_i,coup_precedant):
    '''
    paramètres : plateau_actu = liste(8*8) et une liste de 2 liste([ligne,colone] =[0;7]
    fontion qui dit si le roi est en echec
    '''
    echec = False
    roi = []
    controle_de_case = mouv_noir(plateau_i,coup_precedant[1][0],coup_precedant[1][1],coup_precedant)    #donne tout les coups que a une piece si elle pouvais bouger 2 fois
    for ligne in range(8):
        for colone in range(8):
            if plateau_i[ligne][colone] == 255:
                roi = [ligne,colone]

    for i in range(1,len(controle_de_case),2):
        if roi == controle_de_case[i]:
            echec = True
    return echec







def echec_roi_noir(plateau_i,coup_precedant):
    '''
    paramètres : plateau_actu = liste(8*8) et une liste de 2 liste([ligne,colone] =[0;7]
    fontion qui dit si le roi est en echec
    '''
    echec = False
    roi = []
    controle_de_case = mouv_blanc(plateau_i,coup_precedant[1][0],coup_precedant[1][1],coup_precedant)    #donne tout les coups que a une piece si elle pouvais bouger 2 fois
    for ligne in range(8):
        for colone in range(8):
            if plateau_i[ligne][colone] == -255:
                roi = [ligne,colone]

    for i in range(1,len(controle_de_case),2):
        if roi == controle_de_case[i]:
            echec = True
    return echec

def interception_echec_noir(plateau_i,echec,coup_precedant):   #sert a rien avec la nouvelle version du clouage
    coup = []


    '''
    paramètres : plateau_actu = liste(8*8),echec = booléins  et une liste de 2 liste([ligne,colone] =[0;7]
    fonction qui donne les coup qui intercepte la menace ou pour le faire bouger
    '''
    interception = []
    controle_de_case = mouv_blanc(plateau_i,coup_precedant[1][0],coup_precedant[1][1],coup_precedant)
    for ligne in range(8):
        for colone in range(8):

            if plateau_i[ligne][colone] <0 and plateau_i[ligne][colone] != -255 :         #mouv de toutes les pieces noir sauf le roi
                coup = coup +  mouv_noir(plateau_i,ligne,colone,coup_precedant)

    for i in range(1,len(coup),2):      #on retire les coup impossible


        plateau_i[coup[i][0]][coup[i][1]] = plateau_i[coup[i-1][0]][coup[i-1][1]] #fait jouer un coupo au noir
        plateau_i[coup[i-1][0]][coup[i-1][1]] = 0


        if not(echec_roi_noir(plateau_i,coup_precedant)):
            interception = interception +[coup[i-1],coup[i]]

        plateau_i[coup[i-1][0]][coup[i-1][1]] = plateau_i[coup[i][0]][coup[i][1]] #fait revenir le plateau comme il étéait avant
        plateau_i[coup[i][0]][coup[i][1]] = 0


    return interception  # a bien été testé



def grand_rook_noir(plateau_i,nb_m_roi,nb_m_tour0):
    '''
    parametre : plateau_i = tableau de 8*8 , le reste des entier
    def qui renvoi  oui ou non ilk peut faire le grand rook  rook
    '''
    rook = True
    if nb_m_roi != 0 :
        rook = False

    if nb_m_tour0 != 0 :
        rook = False

    for i in range(4):
        if plateau_i[0,i] != 0:
            rook = False
    return rook

def grand_rook_blanc(plateau_i,nb_m_roi,nb_m_tour0):
    '''
    parametre : plateau_i = tableau de 8*8 , le reste des entier
    def qui renvoi  oui ou non ilk peut faire le grand rook  rook
    '''
    rook = True
    if nb_m_roi != 0 :
        rook = False

    if nb_m_tour0 != 0 :
        rook = False

    for i in range(4):
        if plateau_i[7,i] != 0:
            rook = False
    return rook



def petit_rook_noir(plateau_i,nb_m_roi,nb_m_tour7):
    '''
    parametre : plateau_i = tableau de 8*8 , le reste des entier
    def qui renvoi  oui ou non ilk peut faire le petit rook
    '''
    rook = True
    if nb_m_roi != 0 :
        rook = False

    if nb_m_tour7 != 0 :
        rook = False

    for i in range(5,8):
        if plateau_i[0,i] != 0:
            rook = False
    return rook

def petit_rook_blanc(plateau_i,nb_m_roi,nb_m_tour7):
    '''
    parametre : plateau_i = tableau de 8*8 , le reste des entier
    def qui renvoi  oui ou non ilk peut faire le petit rook
    '''
    rook = True
    if nb_m_roi != 0 :
        rook = False

    if nb_m_tour7 != 0 :
        rook = False

    for i in range(5,8):
        if plateau_i[7,i] != 0:
            rook = False
    return rook

def  clouage_noir(plateau_i):
    """
    parametre ; liste de 8*8
    fonction qui renvoit tout les coup avec clouage
    """
    coup_b = []
    coup =[]
    coup_clouage = []


    for ligne in range(8):
        for colone in range(8):
            if plateau_i[ligne][colone] == -255:

                roi = [ligne,colone]
            elif plateau_i[ligne][colone] <0 :

                coup = coup + mouv_noir(plateau_i,ligne,colone,[[0,0],[ligne,colone]])



    for i in range(1,len(coup),2):
        coup_b =[]
        piece = plateau_i[coup[i][0]][coup[i][1]]
        plateau_i[coup[i][0]][coup[i][1]] = plateau_i[coup[i-1][0]][coup[i-1][1]] #fait jouer un coup au noir
        plateau_i[coup[i-1][0]][coup[i-1][1]] = 0
        for l in range(8):
            for c in range(8):
                if plateau_i[l][c] >0 :
                    coup_b = coup_b +mouv_blanc(plateau_i,l,c,[[0,0],[l,c]]) # on s'en fiche ici de la variable coup precédent

        if not(roi in coup_b):

            coup_clouage = coup_clouage +[coup[i-1],coup[i]]


        plateau_i[coup[i-1][0]][coup[i-1][1]] = plateau_i[coup[i][0]][coup[i][1]] #fait revenir le plateau comme il étéait avant
        plateau_i[coup[i][0]][coup[i][1]] = piece



    return coup_clouage   #tester

def  clouage_blanc(plateau_i):
    """
    parametre ; liste de 8*8
    fonction qui renvoit tout les coup avec clouage blanc
    """

    coup_n = []
    coup =[]
    coup_clouage = []




    for ligne in range(8):
        for colone in range(8):

            if plateau_i[ligne][colone] == 255:

                roi = [ligne,colone]
            elif plateau_i[ligne][colone] >0 :

                coup = coup + mouv_blanc(plateau_i,ligne,colone,[[0,0],[ligne,colone]])



    for i in range(1,len(coup),2):
        coup_n =[]
        piece = plateau_i[coup[i][0]][coup[i][1]]
        plateau_i[coup[i][0]][coup[i][1]] = plateau_i[coup[i-1][0]][coup[i-1][1]] #fait jouer un coup au noir
        plateau_i[coup[i-1][0]][coup[i-1][1]] = 0
        for l in range(8):
            for c in range(8):
                if plateau_i[l][c] <0 :
                    coup_n = coup_n +mouv_noir(plateau_i,l,c,[[0,0],[l,c]]) # on s'en fiche ici de la variable coup precédent

        if not(roi in coup_n):

            coup_clouage = coup_clouage +[coup[i-1],coup[i]]


        plateau_i[coup[i-1][0]][coup[i-1][1]] = plateau_i[coup[i][0]][coup[i][1]] #fait revenir le plateau comme il étéait avant
        plateau_i[coup[i][0]][coup[i][1]] = piece



    return coup_clouage


def anti_sucide_noir(plateau_i,coup_precedant):
    """
    parametre ; toujours les même
    fonction qui retourne les coup legal du roi noir
    """
    anti_s = []

    for l in range(8):
        for c in range(8):

            if plateau_i[l][c] == -255:
                roi = [l,c]
                coup_roi = mouv_noir(plateau_i,l,c,coup_precedant)

    for i in range(1,len(coup_roi),2):

        coup = []
        piece = plateau_i[coup_roi[i][0]][coup_roi[i][1]]
        plateau_i[coup_roi[i][0]][coup_roi[i][1]] = -255 #fait jouer un coup au roi noir
        plateau_i[coup_roi[i-1][0]][coup_roi[i-1][1]] = 0
        for ligne in range(8):
            for colone in range(8):
                if plateau_i[ligne][colone]>0 :
                    coup = coup+ mouv_blanc(plateau_i,ligne,colone,coup_precedant)


        if not(coup_roi[i] in coup):

            anti_s = anti_s +[roi,coup_roi[i]]
        plateau_i[coup_roi[i-1][0]][coup_roi[i-1][1]] = plateau_i[coup_roi[i][0]][coup_roi[i][1]] #fait revenir le plateau comme il étéait avant
        plateau_i[coup_roi[i][0]][coup_roi[i][1]] = piece

    return anti_s

    #testé

def anti_sucide_blanc(plateau_i,coup_precedant):

    """
    parametre ; toujours les même
    fonction qui retourne les coup legal du roi blanc
    """

    anti_s = []
    roi = []
    for l in range(8):
        for c in range(8):
            if plateau_i[l][c] == 255:
                
                roi = [l,c]
                coup_roi = mouv_blanc(plateau_i,l,c,coup_precedant)
    
    if roi == []: # juste pour le debbogage
        print(plateau_i)
    for i in range(1,len(coup_roi),2):

        coup = []
        piece = plateau_i[coup_roi[i][0]][coup_roi[i][1]]
        plateau_i[coup_roi[i][0]][coup_roi[i][1]] = 255 #fait jouer un coup au roi noir
        plateau_i[coup_roi[i-1][0]][coup_roi[i-1][1]] = 0
        for ligne in range(8):
            for colone in range(8):
                if plateau_i[ligne][colone]<0 :
                    coup = coup+ mouv_noir(plateau_i,ligne,colone,coup_precedant)


        if not(coup_roi[i] in coup):

            anti_s = anti_s +[roi,coup_roi[i]]
        plateau_i[coup_roi[i-1][0]][coup_roi[i-1][1]] = plateau_i[coup_roi[i][0]][coup_roi[i][1]] #fait revenir le plateau comme il étéait avant
        plateau_i[coup_roi[i][0]][coup_roi[i][1]] = piece

    return anti_s



def eval(plateau_i,coup_p):
    """
    parametre : p = position de jeu d'echec(tableau 8*8)
    fonction qui evalue une position et qui retourne le score de celle ci
    """
    score = 0

    coup = coup_l_n(plateau_i,coup_precedant) + coup_l_b(plateau_i,coup_precedant)
    win = win_nul(plateau_i,coup_p,coup)
    if win == -1:
        return 0
    elif win == 1:
        if piece_jouer[0] > 0 :
            return +inf
        else:
            return -inf
    else :
        for i in range(1,len(coup),2):
            piece = plateau_i[coup[i-1][0]][coup[i-1][1]]


            if piece < 0:

                if piece == -9 :
                    score = score -9
                elif piece == -8 or  piece == -3:
                    score = score -3
                elif piece == -5:
                    score = score -5
                elif piece == -1 or piece == -255:

                    score = score -1
            elif piece > 0 :
                if piece == 9 :
                    score = score +9
                elif piece == 8 or piece ==3 :
                    score = score +3
                elif piece == 5:
                    score = score +5
                elif piece == 1 or piece ==255:
                    score = score +1

        return score

#doit marcher



def coup_l_n(plateau_i,coup_precedant):
    """
    parametres : plateau_i : 8liste avec 8 argument dans une liste
    fonction qui devra retourne tout les coup legaux

    """


    coup_legal =[]
    coup_legal = coup_legal + clouage_noir(plateau_i)
    coup_legal = coup_legal +anti_sucide_noir(plateau_i,coup_precedant)

    return coup_legal

def coup_l_b(plateau_i,coup_precedant):
    """
    parametres : plateau_i : 8liste avec 8 argument dans une liste
    fonction qui devra retourne tout les coup legaux

    """


    coup_legal =[]
    coup_legal = coup_legal + clouage_blanc(plateau_i)

    coup_legal = coup_legal +anti_sucide_blanc(plateau_i,coup_precedant)

    return coup_legal


# assert coup_l(plateau_i,coup_precedant)

def interface():
    """
    fonction qui crée 64 canvas noir,blanc
    """
    for i in range(8):
        for b in range(0,8,2):
            if i % 2 ==0:
                canevas.create_rectangle(i*taille,b*taille,(i+1)*taille,(b+1)*taille,fill='White')
                canevas.create_rectangle(i*taille,(b+1)*taille,(i+1)*taille,(b+2)*taille,fill='Grey')
            else:
                canevas.create_rectangle(i*taille,b*taille,(i+1)*taille,(b+1)*taille,fill='Grey')
                canevas.create_rectangle(i*taille,(b+1)*taille,(i+1)*taille,(b+2)*taille,fill='White')

def piece(liste):
    """
    affiche les piece sur l'echequier
    """
    for l in range(8):
        for c in range(8):
            canevas.create_text(l*taille+25,c*taille+25, text=str(liste[c][l]))

def win_nul(plateau_i,coup_precedant,coup):
    """
    parametre:la flemme
    fonction qui retourne -1,0,1 == nul , rien , victoire
    """
    win = 0
    if coup == [] :
        win = -1 #valeur pour la nul
        if echec_roi_noir(plateau_i,coup_precedant) or echec_roi_blanc(plateau_i,coup_precedant):
            win = 1
    return win

def clic(event):
    if piece_jouer[0] <0 :
        coup = coup_l_b(plateau_i,coup_precedant)           #joueur
        win = win_nul(plateau_i,coup_precedant,coup)

        if win == 1 :
            print("les noir ont gagné")
            fenetre.destroy()
        elif win == -1 :
            print("nul plus de coup legal")
            fenetre.destroy()
        else :
            coup_legal = []



            souris=[event.x,event.y]
            x_pixel=souris[0]
            y_pixel=souris[1]
            a=int(x_pixel/taille)
            b=int(y_pixel/taille)
            interface()
            canevas.create_rectangle(a*taille,b*taille,(a+1)*taille,(b+1)*taille,fill='yellow')    #met la case selectionner en jaune

            for l in range(0,len(coup)-1,2):

                if coup[l] == a_c_selec:

                    coup_legal = coup_legal + [coup[l],coup[l+1]]

            for i in range(1,len(coup_legal),2):

                if coup_legal[i] == [b,a]:

                    plateau_i[b][a] = plateau_i[coup_legal[i-1][0]][coup_legal[i-1][1]]     # pb piece disparai sur la 3 rangée(umain)(a vers les pion enfaite),resolu
                    plateau_i[coup_legal[i-1][0]][coup_legal[i-1][1]] =0
                    piece_jouer[0]= plateau_i[b][a]
                    coup_precedant[0] = [coup_legal[i-1][0],coup_legal[i-1][1]]
                    coup_precedant[1] = [coup_legal[i][0],coup_legal[i][1]]



            coup_legal = []
            for d in range(0,len(coup)-1,2):

                if coup[d] == [b,a]:

                    coup_legal = coup_legal + [coup[d],coup[d+1]]



            for loop in range(1,len(coup_legal),2):    #montre les coup possible de la piece selectionner
                x = coup_legal[loop][1]
                y = coup_legal[loop][0]


                canevas.create_rectangle(x*taille,y*taille,(x+1)*taille,(y+1)*taille,fill='yellow')

            a_c_selec[0] = b
            a_c_selec[1] = a







    else :  #pour voir si c'est au noir de jouer (ici une ia)
        coup = coup_l_n(plateau_i,coup_precedant)
        coup_min = minmax(plateau_i,2,coup_precedant)
        piece_jouer[0] = plateau_i[coup_min[0][0]][coup_min[0][1]]
        a_c_selec[0] = coup_min[0][0]
        a_c_selec[1] = coup_min[0][1]
        p,coup_precedent = jouer(plateau_i,coup_min,1,True,0)# pas besoin de la var piece ici

    piece(plateau_i)   # remet les piece sur le plateau car cacher par les dernier canevas ajouter

    if piece_jouer[0] <0 :
        coup = coup_l_b(plateau_i,coup_precedant)           #joueur
        win = win_nul(plateau_i,coup_precedant,coup)

        if win == 1 :
            print("les noir ont gagné")
            fenetre.destroy()
        elif win == -1 :
                print("nul plus de coup legal")
        fenetre.destroy()
    elif piece_jouer[0] > 0 :  #pour voir si c'est au noir de jouer (ici une ia)
        coup = coup_l_n(plateau_i,coup_precedant)  # pb plateau_i change(résolue)
        win = win_nul(plateau_i,coup_precedant,coup)

        if win == 1 :
            print("les blanc ont gagné")
            fenetre.destroy()
        elif win == -1 :
            print("nul plus de coup legal")
            fenetre.destroy() # produit une erreur mais pas grave car fin du programme





def clic_gauche(event):  #bug au bon d'un moment peux plus jouer-> pas de message d'erreur(résolu)
    """ Gestion et reception d'evenement, ici clic gauche de la souris """
    # Plus de boucle while, on repete le clic tant que le jeu
    # n'est pas fini
    if piece_jouer[0] <0 :
        coup = coup_l_b(plateau_i,coup_precedant)

    elif piece_jouer[0] > 0 :  #pour voir si c'est au noir de jouer
        coup = coup_l_n(plateau_i,coup_precedant)  # pb plateau_i change(résolue)


    coup_legal = []



    souris=[event.x,event.y]
    x_pixel=souris[0]
    y_pixel=souris[1]
    a=int(x_pixel/taille)
    b=int(y_pixel/taille)
    interface()
    canevas.create_rectangle(a*taille,b*taille,(a+1)*taille,(b+1)*taille,fill='yellow')    #met la case selectionner en jaune

    for l in range(0,len(coup)-1,2):

        if coup[l] == a_c_selec:

            coup_legal = coup_legal + [coup[l],coup[l+1]]

    for i in range(1,len(coup_legal),2):

        if coup_legal[i] == [b,a]:

            plateau_i[b][a] = plateau_i[coup_legal[i-1][0]][coup_legal[i-1][1]]     # pb piece disparai sur la 3 rangée(umain)(a vers les pion enfaite),resolu
            plateau_i[coup_legal[i-1][0]][coup_legal[i-1][1]] =0
            piece_jouer[0]= plateau_i[b][a]
            coup_precedant[0] = [coup_legal[i-1][0],coup_legal[i-1][1]]
            coup_precedant[1] = [coup_legal[i][0],coup_legal[i][1]]



    coup_legal = []
    for d in range(0,len(coup)-1,2):

        if coup[d] == [b,a]:

            coup_legal = coup_legal + [coup[d],coup[d+1]]



    for loop in range(1,len(coup_legal),2):    #montre les coup possible de la piece selectionner
        x = coup_legal[loop][1]
        y = coup_legal[loop][0]


        canevas.create_rectangle(x*taille,y*taille,(x+1)*taille,(y+1)*taille,fill='yellow')

    a_c_selec[0] = b
    a_c_selec[1] = a


    piece(plateau_i)   # remet les piece sur le plateau car cacher par les dernier canevas ajouter


    if piece_jouer[0] <0 :
        coup = coup_l_b(plateau_i,coup_precedant)           #joueur
        win = win_nul(plateau_i,coup_precedant,coup)

        if win == 1 :
            print("les noir ont gagné")
            fenetre.destroy()
        elif win == -1 :
            print("nul plus de coup legal")
            fenetre.destroy()
    elif piece_jouer[0] > 0 :  #pour voir si c'est au noir de jouer (ici une ia)
        coup = coup_l_n(plateau_i,coup_precedant)  # pb plateau_i change(résolue)
        win = win_nul(plateau_i,coup_precedant,coup)

        if win == 1 :
            print("les blanc ont gagné")
            fenetre.destroy()
        elif win == -1 :
            print("nul plus de coup legal")
            fenetre.destroy() # produit une erreur mais pas grave car fin du programme

def clique(event):
    if piece_jouer[0] <0 :
        coup = coup_l_b(plateau_i,coup_precedant)
        coup_legal =[]



        souris=[event.x,event.y]
        x_pixel=souris[0]
        y_pixel=souris[1]
        a=int(x_pixel/taille)
        b=int(y_pixel/taille)
        interface()
        canevas.create_rectangle(a*taille,b*taille,(a+1)*taille,(b+1)*taille,fill='yellow')    #met la case selectionner en jaune

        for l in range(0,len(coup)-1,2):

            if coup[l] == a_c_selec:

                coup_legal = coup_legal + [coup[l],coup[l+1]]

        for i in range(1,len(coup_legal),2):

            if coup_legal[i] == [b,a]:

                plateau_i[b][a] = plateau_i[coup_legal[i-1][0]][coup_legal[i-1][1]]     # pb piece disparai sur la 3 rangée(umain)(a vers les pion enfaite),resolu
                plateau_i[coup_legal[i-1][0]][coup_legal[i-1][1]] =0
                piece_jouer[0]= plateau_i[b][a]
                coup_precedant[0] = [coup_legal[i-1][0],coup_legal[i-1][1]]
                coup_precedant[1] = [coup_legal[i][0],coup_legal[i][1]]



        coup_legal = []
        for d in range(0,len(coup)-1,2):

            if coup[d] == [b,a]:

                coup_legal = coup_legal + [coup[d],coup[d+1]]



        for loop in range(1,len(coup_legal),2):    #montre les coup possible de la piece selectionner
            x = coup_legal[loop][1]
            y = coup_legal[loop][0]


            canevas.create_rectangle(x*taille,y*taille,(x+1)*taille,(y+1)*taille,fill='yellow')

        a_c_selec[0] = b
        a_c_selec[1] = a
        piece(plateau_i)

        if piece_jouer[0] >0 :
            coup = coup_l_n(plateau_i,coup_precedant)           #joueur
            win = win_nul(plateau_i,coup_precedant,coup)

            if win == 1 :
                print("les blanc ont gagné")
                fenetre.destroy()
            elif win == -1 :
                print("nul plus de coup legal")
                fenetre.destroy()
            else :
                coup_legal = []





def cliquer(event):
    if piece_jouer[0] > 0:
        print("reflechi")
        coup = coup_l_n(plateau_i,coup_precedant)


        print("jouer")
        interface()
        piece(plateau_i)    # remet les piece sur le plateau car cacher par les dernier canevas ajouter
        if piece_jouer[0] < 0 :  #pour voir si c'est au BLANC    de jouer (ici une ia)
            coup = coup_l_b(plateau_i,coup_precedant)  # pb plateau_i change(résolue)
            win = win_nul(plateau_i,coup_precedant,coup)

            if win == 1 :
                print("les NOIR ont gagné")

                fenetre.destroy()
            elif win == -1 :

                print("nul plus de coup legal")
                fenetre.destroy() # produit une erreur mais pas grave car fin du programme


'''
valeur des pieces:
    pion : 1
    fou ,cavalier: 3,3(representer par un 8)
    tour : 5
    reinne :9
    roi : 255
'''


#plateau initial(nombre negatif pour les noirs),(nombre positif pour les blancs):


plateau_i = [[-5,-8,-3,-9,-255,-3,-8,-5],
[-1,-1,-1,-1,-1,-1,-1,-1],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[1,1,1,1,1,1,1,1],
[5,8,3,9,255,3,8,5]]
coup_precedant = [[0,0],[0,0]]
piece_jouer= [-1]
a_c_selec = [-1,-1]


from tkinter import *
# pour creer l'interface
a = [-inf]
b=[+inf]
fenetre = Tk()
taille = 50
hauteur = 8
largeur = 8


canevas = Canvas(fenetre,width=largeur*taille,height=hauteur*taille)
canevas.pack()
interface()
piece(plateau_i)
def j12():



    canevas.bind("<Button-1>",clic_gauche)



    # Avec le mainloop : plus d'input et de print !!!
    # On joue on n'est plus dans la console...
    fenetre.mainloop()

def j1_ordi():

    canevas.bind("<Button-1>",clic)


    fenetre.mainloop()


def j1_ordi_2():


    canevas.bind("<Button-1>",clique)

    canevas.bind_all('<space>',cliquer)


    fenetre.mainloop()








def max_v(p,d,coup_p):
    """
    paramètres : p une position , d : une profondeur , cou_p :le coup precedent)
    fonction qui te donne le score max d'une position
    """
    score_max = -inf
    coup = coup_l_b(p,coup_p)

    if len(coup)== 0 or d == 0:
        return eval(p,coup_p)
    else :
        for i in range(1,len(coup),2):      #parcour tout le noeud
            piece = p[coup[i][0]][coup[i][1]]
            p,coup_p2 =jouer(p,coup,i,True,piece)

            score = min_v(p,d-1,coup_p2) #c'est le tour de l'adv


            p,coup_p2 =jouer(p,coup,i,False,piece)

            if score > score_max : #maximise le score
                score_max = score


        return score_max

def min_v(p,d,coup_p):  #la même mais àa minimise
    score_min = +inf
    coup = coup_l_n(p,coup_p)

    if len(coup)== 0 or d == 0:
        return eval(p,coup_p)
    else :
        for i in range(1,len(coup),2):
            piece = p[coup[i][0]][coup[i][1]]
            p,coup_p2 =jouer(p,coup,i,True,piece)

            score = max_v(p,d-1,coup_p2)


            p,coup_p2 =jouer(p,coup,i,False,piece)

            if score < score_min :
                score_min = score



        return score_min
#pr 3 : 3s
#pr 5 : 30s
#pr 7 : +5 min

def jouer(p,coup,i,ctr,piece):

    if ctr :

        p[coup[i][0]][coup[i][1]] = p[coup[i-1][0]][coup[i-1][1]]

        p[coup[i-1][0]][coup[i-1][1]] = 0


        coup_p = [coup[i-1],coup[i]]
    else:
        
        p[coup[i-1][0]][coup[i-1][1]] = p[coup[i+1][0]][coup[i-1][1]]
        p[coup[i][0]][coup[i][1]] = 0
        coup_p = []
    return p,coup_p
#a améliorer





def minmax(p,d,coup_p):
    """
    par: les meme
    def qui explore l'arbre des possibilitée de la position est renvoie le meilleur coup
    """
    if piece_jouer[0] <0 :
        #au max de jouer(blanc)
        score_max = -inf
        coup = coup_l_b(p,coup_p)

        if len(coup)== 0 or d == 0:
            return eval(p,coup_p)
        else :
            for i in range(1,len(coup),2):
                piece = p[coup[i][0]][coup[i][1]]
                p[coup[i][0]][coup[i][1]] = p[coup[i-1][0]][coup[i-1][1]]
                p[coup[i-1][0]][coup[i-1][1]] = 0

                score = max_v(p,d-1,[coup[i-1],coup[i]])
                p[coup[i-1][0]][coup[i-1][1]] = p[coup[i][0]][coup[i][1]]
                p[coup[i][0]][coup[i][1]] =piece

                if score > score_max :

                    score_max = score
                    best_move = [coup[i-1],coup[i]]


    else :

        score_min = +inf
        coup = coup_l_n(p,coup_p)
        if len(coup)== 0 or d == 0:
            return eval(p,coup_p)

        for i in range(1,len(coup),2):
            piece = p[coup[i-1][0]][coup[i-1][1]]
            p,coup_p2 =jouer(p,coup,i,True,piece)

            score = min_v(p,d-1,coup_p2)


            p,coup_p2 =jouer(p,coup,i,False,piece)

            if score < score_min :
                score_min = score
                best_move = [coup[i-1],coup[i]]




    return best_move

promo = [3, 5, 8, 9]
promo_n = [-3,-5, -8, -9]
cmpt = [0]
#minimax avec élagage alpha beta

def minmax_a_b(p,d,coup_p,tour):
    sc = -inf
    coup = coup_l_b(p,coup_p)
    coup_n = coup_l_n(p,coup_p)
    """
    par:même
    fonction qui renvoie le meilleur score si les 2j joue le mieux(si ma fonction d'évaluation serai parfaite) en explorant que certaines possibilitées en utilisant les coupes alpha beta ,intervale [alpha,beta]
    (dans les autre fonction)
    """
    if d ==0 or win_nul(plateau_i,coup_p,coup) != 0 or win_nul(plateau_i,coup_p,coup) !=0 : #a tester pour la 2eme partie
        return eval(p,coup_p)
    elif tour == 1:
        
        sc_max =-inf
        
        for i in range(1,len(coup),2):
            piece_jouer[0]= 1 #s'en fou de la valeur tant que sup a 0 (enfin je crois)
            piecetmp = p[coup[i][0]][coup[i][1]]
            p[coup[i][0]][coup[i][1]] = p[coup[i-1][0]][coup[i-1][1]]
            p[coup[i-1][0]][coup[i-1][1]] = 0
            print(sc,sc_max)
            if coup[i][0] ==0 and p[coup[i][0]][coup[i][1]] ==1:
                for j in promo:
                    p[coup[i][0]][coup[i][1]] = j
                    sc = minmax_a_b(p,d-1,[coup[i-1],coup[i]],-1)
                    
                    
                    if sc > sc_max:
                        sc_max =sc
                p[coup[i-1][0]][coup[i-1][1]] = 1
                p[coup[i][0]][coup[i][1]] =piecetmp
                
                
            else:
                
                sc = minmax_a_b(p,d-1,[coup[i-1],coup[i]],-1)
                print(sc)
                p[coup[i-1][0]][coup[i-1][1]] = p[coup[i][0]][coup[i][1]]
                p[coup[i][0]][coup[i][1]] =piecetmp
                
                if sc > sc_max :
                    sc_max =sc
            
            
        return sc_max
    elif tour ==-1:
       
        sc_min = +inf
        for i in range(1,len(coup_n),2):
            piece_jouer[0]= -1
            piecetmp = p[coup_n[i][0]][coup_n[i][1]]
            p[coup_n[i][0]][coup_n[i][1]] = p[coup_n[i-1][0]][coup_n[i-1][1]]
            p[coup_n[i-1][0]][coup_n[i-1][1]] = 0
            if coup_n[i][0] ==7 and p[coup_n[i][0]][coup_n[i][1]] ==-1:
                for j in promo_n:
                    p[coup_n[i][0]][coup_n[i][1]] = j

                    sc = minmax_a_b(p,d-1,[coup_n[i-1],coup_n[i]],1)
                    
                    if sc < sc_min:
                        sc_min =sc
                p[coup_n[i-1][0]][coup_n[i-1][1]] = -1
                p[coup_n[i][0]][coup_n[i][1]] =piecetmp
                    
            else:
                sc = minmax_a_b(p,d-1,[coup_n[i-1],coup_n[i]],1)
            
                p[coup_n[i-1][0]][coup_n[i-1][1]] = p[coup_n[i][0]][coup_n[i][1]]
                p[coup_n[i][0]][coup_n[i][1]] =piecetmp
                
                if sc < sc_min:
                    sc_min =sc

        return sc_min    

        
    






def promotion_pion_n(plateau_i, a, b, valeur):
    """
    Fonction qui permet de promouvoir un pion noir en choisissant une nouvelle valeur pour la case
    Paramètres:
    plateau_i : tableau 8x8 représentant l'état du jeu
    b, a : les coordonnées de la case contenant le pion à promouvoir
    valeur : la valeur choisie pour la case de promotion (-3 pour un fou, -5 pour une tour, -8 pour un cavalier, -9 pour une reine)
    """
    # Pas de verif de position car c'est cela qui appellera la fonction  plus tard
    # Vérifie si la nouvelle valeur est autorisée
    if valeur not in [-3, -5, -8, -9]:
        print("La valeur choisie pour la promotion est invalide.")
        return(plateau_i)
    else:
        plateau_i[b][a] = valeur

    return(plateau_i[b][a])

def promotion_pion_b(plateau_i, a, b, valeur):
    """
    Fonction qui permet de promouvoir un pion blanc en choisissant une nouvelle valeur pour la case
    Paramètres:
    plateau_i : tableau 8x8 représentant l'état du jeu
    b, a : les coordonnées de la case contenant le pion à promouvoir
    valeur : la valeur choisie pour la case de promotion (3 pour un fou, 5 pour une tour, 8 pour un cavalier, 9 pour une reine)
    """
    # Pas de verif de position car c'est cela qui appellera la fonction  plus tard
    # Vérifie si la nouvelle valeur est autorisée
    if valeur not in [3, 5, 8, 9]:
        print("La valeur choisie pour la promotion est invalide.")
        return(plateau_i)
    else:
        plateau_i[b][a] = valeur

    return(plateau_i[b][a])






