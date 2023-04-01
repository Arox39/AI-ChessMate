################################################################################
#        TROPHÉE NSI: JEU D'ECHECS AVEC INTELLIGENCE ARTIFICIELLE              #
################################################################################





from math import*

#plateau initial(nombre negatif pour les noirs),(nombre positif pour les blancs):


plateau_i = [[-5,-8,-3,-9,-255,-3,-8,-5],
[-1,-1,-1,-1,-1,-1,-1,-1],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[1,1,1,1,1,1,1,1],
[5,8,3,9,255,3,8,5]]


def mouv_blanc(position_actu:list, ligne:int, colone:int, coup_precedant):

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
    controle_de_case = mouv_noir(plateau_i,coup_precedant[1][0],coup_precedant[1][1],coup_precedant)    #donne tout les coups que' a une piece si elle pouvais bouger 2 fois
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
    controle_de_case = mouv_blanc(plateau_i,coup_precedant[1][0],coup_precedant[1][1],coup_precedant)    #donne tout les coups qu' a une piece si elle pouvais bouger 2 fois
    for ligne in range(8):
        for colone in range(8):
            if plateau_i[ligne][colone] == -255:
                roi = [ligne,colone]

    for i in range(1,len(controle_de_case),2):
        if roi == controle_de_case[i]:
            echec = True
    return echec

def grand_rook_noir(plateau_i, nb_m_roi, nb_m_tour0):
    '''
    parametres:
    plateau_i : tableau de 8*8 représentant le plateau d'échecs
    nb_m_roi : nombre de mouvements du roi noir
    nb_m_tour0 : nombre de mouvements de la tour à gauche du roi noir
    retourne True si le grand roque est possible pour le roi noir, False sinon
    '''
    
    rook = True
    
    # Vérifier si le nombre de mouvements du roi et de la tour est égal à 0
    if nb_m_roi != 0 or nb_m_tour0 != 0:
        rook = False
    
    # Vérifier si les cases entre le roi et la tour sont vides
    for i in range(1, 4):
        if plateau_i[0][i] != 0:
            rook = False
    return rook

def grand_rook_blanc(plateau_i, nb_m_roi, nb_m_tour0):
    '''
    parametres:
    plateau_i : tableau de 8*8 représentant le plateau d'échecs
    nb_m_roi : nombre de mouvements du roi noir
    nb_m_tour0 : nombre de mouvements de la tour à gauche du roi blanc
    retourne True si le grand roque est possible pour le roi blanc, False sinon
    '''
    
    rook = True
    
    # Vérifier si le nombre de mouvements du roi et de la tour est égal à 0
    if nb_m_roi != 0 or nb_m_tour0 != 0:
        rook = False
    
    # Vérifier si les cases entre le roi et la tour sont vides
    for i in range(1, 4):
        if plateau_i[0][i] != 0:
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
    fonction qui renvoit tout les coups avec clouage
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

    
    print(coup)
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


def anti_suicide_noir(plateau_i,coup_precedant):
    """
    parametre ; toujours les même
    fonction qui retourne les coups legaux du roi noir
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

def anti_suicide_blanc(plateau_i,coup_precedant):

    """
    parametre ; toujours les même
    fonction qui retourne les coups legaux du roi blanc
    """

    anti_s = []
    
    for l in range(8):
        for c in range(8):

            if plateau_i[l][c] == 255:
                roi = [l,c]
                coup_roi = mouv_blanc(plateau_i,l,c,coup_precedant)

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
        plateau_i[coup_roi[i-1][0]][coup_roi[i-1][1]] = plateau_i[coup_roi[i][0]][coup_roi[i][1]] #fait revenir le plateau comme il était avant
        plateau_i[coup_roi[i][0]][coup_roi[i][1]] = piece

    return anti_s

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


def eval(plateau_i):
    """
    parametre : p = position de jeu d'echec(tableau 8*8)
    fonction qui evalue une position et qui retourne le score de celle ci
    """

    score = 0
    coup = coup_l_n(plateau_i,coup_precedant) + coup_l_b(plateau_i,coup_precedant) 
    

    for ligne in range(8):
        for colone in range(8):
            compteur = 0
            for d in range(0,len(coup)-1,2):
                if coup[d] == [ligne,colone]:

                    compteur = compteur +1
            
            if plateau_i[ligne][colone] ==8:
                score = score + compteur * 3
            elif plateau_i[ligne][colone] == -8:
                score = score + compteur * -3
            elif plateau_i[ligne][colone] ==255 :
                score = score + compteur * 1
            elif plateau_i[ligne][colone] ==-255:
                score = score + compteur * -1
            else :  
                score = score + compteur * plateau_i[ligne][colone]
        
              
            
    return score
            
#doit marcher            



def coup_l_n(plateau_i,coup_precedant):
    """
    parametres : plateau_i : 8liste avec 8 argument dans une liste
    fonction qui devra retourne tout les coup legaux

    """

    
    coup_legal =[]   
    coup_legal = coup_legal + clouage_noir(plateau_i)
    coup_legal = coup_legal +anti_suicide_noir(plateau_i,coup_precedant)
            
    return coup_legal

def coup_l_b(plateau_i,coup_precedant):
    """
    parametres : plateau_i : 8liste avec 8 argument dans une liste
    fonction qui devra retourne tout les coup legaux

    """

    
    coup_legal =[]   
    coup_legal = coup_legal + clouage_blanc(plateau_i)
    
    coup_legal = coup_legal +anti_suicide_blanc(plateau_i,coup_precedant)
            
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
    
    


def clic_gauche(event):  
    """ Gestion et reception d'evenement, ici clic gauche de la souris """
    
    # Plus de boucle while, on repete le clic tant que le jeu
    # n'est pas fini
    
    if piece_jouer[0] < 0 :
        coup = coup_l_b(plateau_i,coup_precedant)
        win = win_nul(plateau_i,coup_precedant,coup)
        
        if win == 1 :
            print("les noir ont gagné")
            fenetre.destroy()
        elif win == -1 :
            print("nul plus de coups légaux")
            fenetre.destroy()
    elif piece_jouer[0] > 0 :  
        coup = coup_l_n(plateau_i,coup_precedant) 
        win = win_nul(plateau_i,coup_precedant,coup)
        
        if win == 1 :
            print("les blanc ont gagné")
            fenetre.destroy()
        elif win == -1 :
            print("nul plus de coups legaux")
            fenetre.destroy() 
        
    coup_legal = []
    souris=[event.x,event.y]
    x_pixel=souris[0]
    y_pixel=souris[1]
    a=int(x_pixel/taille)
    b=int(y_pixel/taille)
    interface()
    canevas.create_rectangle(a*taille,b*taille,(a+1)*taille,(b+1)*taille,fill='yellow')    
    #met la case selectionner en jaune

    for l in range(0,len(coup)-1,2):
        
        if coup[l] == a_c_selec:
            coup_legal = coup_legal + [coup[l],coup[l+1]]
    
    for i in range(1,len(coup_legal),2):
        if coup_legal[i] == [b,a]:
            plateau_i[b][a] = plateau_i[coup_legal[i-1][0]][coup_legal[i-1][1]]# pb piece disparai sur la 3 rangée(umain)(a vers les pion enfaite),resolu
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
    
    if plateau_i[b][a] == 1 and b == 0:
        promotion_pion_b(plateau_i, a, b, 9) # promouvoir en reine
    if plateau_i[b][a] == -1 and b == 7:
        promotion_pion_n(plateau_i, a, b, -9) # promouvoir en reine            
    piece(plateau_i)   # remet les piece sur le plateau car cacher par les dernier canevas ajouter
'''
valeur des pieces:
    pion : 1
    fou ,cavalier: 3,3(representer par un 8)
    tour : 5
    reinne :9
    roi : 255
'''



from tkinter import *


# pour creer l'interface
coup_precedant = [[0,0],[0,0]]
piece_jouer= [-1]
a_c_selec = [-1,-1]
fenetre = Tk()
taille = 50
hauteur = 8
largeur = 8

canevas = Canvas(fenetre,width=largeur*taille,height=hauteur*taille)

canevas.pack()
interface()
piece(plateau_i)
canevas.bind("<Button-1>",clic_gauche)



# Avec le mainloop : plus d'input et de print !!!
# On joue on n'est plus dans la console...
fenetre.mainloop()
