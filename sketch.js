// Parametros ambientales-------------------------
let x_par = 50; 
let y_par = 75; 
let temp_ambiente = 25;
let pres_ambiente = 101.3;
let hum_ambiente = 85;
let button1;
let button2;
let button5;
let button6;
let button7;
let button8;
let button9;
let button10;
let button_ag_down;
let button_ag_up;
let button_exp_down;
let button_exp_up;

// Modulo de visualizacion (dashboard)------------------
let x_dash = 50; 
let y_dash = 285; 
let x_comp;//valores relativos al dashboard
let y_comp;
let x_cond;
let y_cond;
let x_rot;
let y_rot;
let x_evap;
let y_evap;
// Controles
let angle_exp;	//exp -> Válvula de expansión 5 Vueltas para 100%
let angle_agua;	//agua -> Válvula de agua refrigeración
let angle_pot;	//pot -> potenciometro de calorímetro
let oldAngle_exp;
let oldAngle_agua;
let oldAngle_pot;
let sent_exp;
let sent_agua;
let sent_pot;
let calcAngle_exp;
let calcAngle_agua;
let calcAngle_pot;
let ap_exp;
let ap_agua;
let pot;
let rz = 35; //Diametro de controles
let drag_exp = false; //Estado del movimiento de válvula de expansión
let drag_agua = false; //Estado del movimiento de válvula de agua
let drag_pot = false; //Estado del movimiento de potenciometro

// Alarmas------------------------------------------------
let x_alarm = 420; //Valor x del alarma
let y_alarm = 75; //Valor y del alarma (665)
let p2_alta;
let flujo_ref_bajo;
let flujo_agua_bajo;

// Otras variables-----------------------------------------
let is_on; //Estado del equipo
let velocidadComp;
let velocidadRPM;
let torque;
let rotPiston;
let n = 1.13; //n de compresión
//Temperaturas
let t1;
let t2;
let t3;
let t4;
let t5;
let t6;
let t_cal;
//Presiones
let p1;// Manometricas en bar
let p2;
let p3;
let p4;
let p1_abs;//absolutas en kpa
let p2_abs;
let p3_abs;
let p4_abs;
//Flujos
let m_ref;
let v_ref;
let m_agua;
let v_agua;
//Entalpias
let ent_1;
let ent_2;
let ent_3;
let ent_4;
let ent_5;
let ent_6;
//Otras propiedades
let vol_esp_3;
let dens_agua = 997;

//Horarios----------------------------------
let horarios = ['H631', 'H632', 'H633', 'H634', 'H635', 'H636', 'H637', 'H638', 'H639', 'H63A', 'H63B','H6M1','H6M2','H6M3','H6M4','H6M5'];

// Logos
let logo_pucp;
let logo_laben;

function preload() {
    logo_pucp = loadImage('https://raw.githubusercontent.com/arturobh143/Refri2_test/gh-pages/img1.jpg');
	logo_laben = loadImage('https://raw.githubusercontent.com/arturobh143/Refri2_test/gh-pages/img2.jpg');
}

function setup() {

    createCanvas(950, 950);
    //createCanvas(displayWidth, displayHeight);
    textAlign(CENTER, CENTER);
    logo_pucp.resize(150, 50);
    logo_laben.resize(150, 50);
	angleMode(DEGREES);
    // Controles-----------------------------------------------------------
    angle_exp = 90;
    oldAngle_exp = 90;
	angle_agua = 359;
    oldAngle_agua = 359.64;
    angle_pot = 135;
    oldAngle_pot = 0;
    sent_exp = 'AntiHorario';
    sent_agua = 'AntiHorario';
	sent_pot = 'AntiHorario';
    calcAngle_exp = 0;
	calcAngle_agua = 0;
    calcAngle_pot = 0;
	ap_exp = 100;
	ap_agua = 0;
	pot = 750;
    velocidadComp = 0;
	velocidadRPM = 1800;
	torque = 0;
    rotPiston = 0;
	//Visualizacion---------------------------
	x_comp = 0;
	y_comp = 0;
	x_cond = 0;
	y_cond = 0;
	x_rot = 0;
	y_rot = 0;
	x_evap = 0;
	y_evap = 0;
    //Movimiento de piston--------------------------------------------------
    b = 100; // Valor inicial 
    z = 20; // Alto del piston
    theta = 0; //Angulo de la biela
    theta_vel = 0.04;
	up_pis = true; //True va hacia arriba

    //-----------------------------------------------------------------------
	p2_alta = false;
	flujo_ref_bajo = true;
	flujo_agua_bajo = true;
	is_on = false;
	//Temperaturas
	t1 = 25;
	t2 = 25;
	t3 = 25;
	t4 = 25;
	t5 = 25;
	t6 = 25;
	t_cal = 25;
	//Presiones
	p1 = 2;
	p2 = 2;
	p3 = 2;
	p4 = 2;
	p1_abs = (p1*100)+pres_ambiente;
	p2_abs = (p2*100)+pres_ambiente;
	p3_abs = (p3*100)+pres_ambiente;
	p4_abs = (p4*100)+pres_ambiente;
	//Flujos
	m_ref = 0;
	m_agua = 0;
	v_ref = 0;
	v_agua = 0;
	//Entalpias
	ent_1 = 0;
	ent_2 = 0;
	ent_3 = 0;
	ent_4 = 0;
	ent_5 = 0;
	ent_6 = 0;
	vol_esp_3 = 1;
    //-----------------------------------------------------------------------
    // Parámetros ambientales-----------------------------------------------
    textAlign(CENTER, CENTER);
	//botones de control de apertura de valvulas
	button_ag_up = createButton('»');
    button_ag_up.position(130, 500);
    button_ag_up.style('width', '20px');
    button_ag_up.mousePressed(Up_ag);
	
	button_ag_down = createButton('«');
    button_ag_down.position(85, 500);
    button_ag_down.style('width', '20px');
    button_ag_down.mousePressed(Down_ag);
	
	button_exp_up = createButton('»');
    button_exp_up.position(555, 655);
    button_exp_up.style('width', '20px');
    button_exp_up.mousePressed(Up_exp);
	
	button_exp_down_down = createButton('«');
    button_exp_down_down.position(420, 655);
    button_exp_down_down.style('width', '20px');
    button_exp_down_down.mousePressed(Down_exp);
	
	// Boton de horario
    button1 = createButton(horarios[0]);
    button1.position(x_par + 240, y_par + 104);
    button1.style('width', '80px');
    //button1.mousePressed(CambioExp);
	button2 = createButton('Iniciar');
    button2.position(x_par + 240, y_par + 134);
    button2.style('width', '80px');
	button2.mousePressed(encender);
    //TEMPERATURA AMBIENTAL
    button5 = createButton('»');
    button5.position(x_par + 170, y_par + 64);
    button5.style('width', '20px');
    button5.mousePressed(Up_temp);
    button6 = createButton('«');
    button6.position(x_par + 10, y_par + 64);
    button6.style('width', '20px');
    button6.mousePressed(Down_temp);
	//PRESIÓN AMBIENTAL
    button7 = createButton('»');
    button7.position(x_par + 170, y_par + 104);
    button7.style('width', '20px');
    button7.mousePressed(Up_presion);
    button8 = createButton('«');
    button8.position(x_par + 10, y_par + 104);
    button8.style('width', '20px');
    button8.mousePressed(Down_presion);
	//HUMEDAD RELATIVA
    button9 = createButton('»');
    button9.position(x_par + 170, y_par + 144);
    button9.style('width', '20px');
    button9.mousePressed(Up_humedad);
    button10 = createButton('«');
    button10.position(x_par + 10, y_par + 144);
    button10.style('width', '20px');
    button10.mousePressed(Down_humedad);
}

function draw() {

    background(220);
    fill(255);
    rect(50, 5, 850, 60);
    fill(0);
    image(logo_pucp, 60, 10);
    image(logo_laben, 740, 10);
	
	//Posición X y Y (para desarrollo)
	//text('X =  ', 470 , 20);
	//text(mouseX, 510 , 20);//mouseX
    //text('Y =  ', 470 , 40);//mouseY
	//text(mouseY, 510 , 40);
	
    //Funciones de dibujo
    dib_parametros(x_par, y_par); //Box de parámetros
	dib_alarma(x_alarm, y_alarm); // Alarmas
    dib_dashboard(x_dash, y_dash); // Ensayo
    

	// Para cuando el equipo este encendido
	if(is_on){
		button1.attribute('disabled', '');
		button5.attribute('disabled', '');
		button6.attribute('disabled', '');
		button7.attribute('disabled', '');
		button8.attribute('disabled', '');
		button9.attribute('disabled', '');
		button10.attribute('disabled', '');
        // Velocidad de motor---------------------------
        velocidadComp = int(velocidadRPM / 2); //[RPM]
        rotPiston = int(velocidadComp / 50);
        
        //Calculos-------------------------------------------------------------------------
		//Presiones
		p2 =7+((0.24853*pow(ap_agua,2)/10000)-((0.7708043*ap_agua)/100) +0.746837)-(1-(ap_exp/100));
		p1 = p2-((-0.1275*pow(ap_exp,2)/1000) - (0.18765*ap_exp/100) + 6.94537);
		p3 = p2;
		p4 = p1;
		p1_abs = (p1*100)+pres_ambiente;
		p2_abs = (p2*100)+pres_ambiente;
		p3_abs = (p3*100)+pres_ambiente;
		p4_abs = (p4*100)+pres_ambiente;
		//Temperaturas
		t1 = ((4*pow(p1_abs,3))/pow(10,9))-((3*pow(p1_abs,2))/pow(10,5))+(0.0949*p1_abs)-28.502;
		t2 = (pow((p1_abs/p2_abs),((1-n)/n))*(t1+273))-273;
		t3 = ((4*pow(p3_abs,3))/pow(10,9))-((3*pow(p3_abs,2))/pow(10,5))+(0.0949*p3_abs)-28.502;
		t4 = ((4*pow(p4_abs,3))/pow(10,9))-((3*pow(p4_abs,2))/pow(10,5))+(0.0949*p4_abs)-28.502;
		//Entalpias
		ent_1 = 15.419*log(p1_abs) + 311.32;
		ent_2 = 15.419*log(p2_abs) + 311.32 + t2 - t3;
		ent_3 = (pow(p3_abs,5)/pow(10,14))-(9*pow(p3_abs,4)/pow(10,11))+(2*pow(p3_abs,3)/pow(10,7))-(0.0003*pow(p3_abs,2))+(0.2668*p3_abs)+143.54;
		ent_4 = ent_3;
		//Flujos masicos
		
		m_ref = (0.0013*pow(ap_exp,2))-(0.0382*ap_exp)+4.6316;
		//Flujos volumetricos
		
		vol_esp_3 = (2*pow(p3_abs,3)/pow(10,14)) - (8*pow(p3_abs,2)/pow(10,11)) + ((2*p3_abs)/pow(10,7)) + 0.0007;
		v_ref = m_ref*vol_esp_3*3600; //Medido en litros/h
		//Temp 5 y 6
		t6 = (m_ref*(ent_2-ent_3)/(4.186*m_agua))+t5;
		t_cal = (pot-(m_ref*(ent_1-ent_4)))*(0.01/2);
		torque = ((m_ref*(ent_2-ent_1))/(0.9*0.85))/(velocidadRPM*2*3.1416/60);
		
		
	}
}

function mousePressed() {
    // Valvula expansion
    if (dist(mouseX, mouseY, x_dash+x_rot +150, y_dash+y_rot -50) < 0.75*rz) {
        drag_exp = true;
    }
    // Válvula agua
    if (dist(mouseX, mouseY, x_dash+x_cond -130, y_dash+y_cond + 100) < rz) {
        drag_agua = true;
    }
	// Válvula Potenciometro
    if (dist(mouseX, mouseY, x_dash +x_evap-85, y_dash+y_evap +250) < rz) {
        drag_pot = true;
    }
}

function mouseReleased() {
    drag_exp = false;
    drag_agua = false;
	drag_pot = false;
}

function Up_ag(){
	if(angle_agua<=0.36){
		angle_agua = 0;
	}else{
		angle_agua = angle_agua -0.36;
	}
}

function Down_ag(){
	
	if(angle_agua>=359.64){
		angle_agua = 360;
	}else{
		angle_agua = angle_agua +0.36;
	}
}

function Up_exp(){
	if((angle_exp>0)&&(angle_exp<=0.36)){
		angle_exp = 0.36;
	}else{
		angle_exp = angle_exp -0.36;
	}
}

function Down_exp(){
	
	if((angle_exp<0)&&(abs(angle_exp)<=0.36)){
		angle_exp = -0.36;
	}else{
		angle_exp = angle_exp +0.36;
	}
}

function Up_temp() {
    if (temp_ambiente < 30.0) {
        temp_ambiente = temp_ambiente + 0.1;
    }
}

function Down_temp() {
    if (temp_ambiente > 15.1) {
        temp_ambiente = temp_ambiente - 0.1;
    }
}

function Up_presion() {
    if (pres_ambiente < 103.0) {
        pres_ambiente = pres_ambiente + 0.1;
    }
}

function Down_presion() {
    if (pres_ambiente > 100.1) {
        pres_ambiente = pres_ambiente - 0.1;
    }
}

function Up_humedad() {
    if (hum_ambiente < 100) {
        hum_ambiente = hum_ambiente + 1;
    }
}

function Down_humedad() {
    if (hum_ambiente > 1) {
        hum_ambiente = hum_ambiente - 1;
    }
}

function encender() {
    is_on = true;
}

function dib_parametros(x1, y1) {
    fill(250);
    strokeWeight(1);
    rect(x1, y1, 360, 200);
    line(x1 + 200, y1 + 10, x1 + 200, y1 + 190);
    // Texto
    fill('black');
    textStyle(BOLD);
    textSize(14);
    text('PARÁMETROS ', x1 + 210 / 2, y1 + 20);
    text('AMBIENTALES ', x1 + 210 / 2, y1 + 40);
    text('SELECCIONAR ', x1 + 280, y1 + 20);
    text('HORARIO ', x1 + 280, y1 + 40);
    // Visualizadores
    fill(0);
    textStyle(BOLD);
    rect(x1 + 40, y1 + 60, 30, 30);
    rect(x1 + 40, y1 + 100, 30, 30);
    rect(x1 + 40, y1 + 140, 30, 30);

    rect(x1 + 80, y1 + 60, 80, 30);
    rect(x1 + 80, y1 + 100, 80, 30);
    rect(x1 + 80, y1 + 140, 80, 30);

    textSize(14);
    fill(0, 255, 0);
    text('Ta', x1 + 55, y1 + 75); //Temperatura ambiental
    text('Pa', x1 + 55, y1 + 115); //presion
    text('Ha', x1 + 55, y1 + 155); //Humedad

    text('°C', x1 + 138, y1 + 75); //Temperatura ambiental
    text('kPa', x1 + 138, y1 + 115); //presion
    text('% HR', x1 + 135, y1 + 155); //Humedad

    text(nfc(temp_ambiente, 1), x1 + 105, y1 + 75); //Temperatura ambiental
    text(nfc(pres_ambiente, 1), x1 + 100, y1 + 115); //presion
    text(hum_ambiente, x1 + 100, y1 + 155); //Humedad
    fill(0);
    textSize(12);
}

function dib_alarma(x3, y3) {
	
    fill(250);
    strokeWeight(1);
    rect(x3, y3, 480, 200);
	fill('black');
    textStyle(BOLD);
	push();
	translate(x3,y3);
	//Indicadores
	fill('black');
	rect(20, 40, 30, 30); //T1
	rect(60,40,80,30);
	rect(180, 40, 30, 30); //P1
	rect(220,40,80,30);
	rect(340, 40, 30, 30); //T5
	rect(380,40,80,30);
	rect(20, 80, 30, 30); //T2
	rect(60,80,80,30);
	rect(180, 80, 30, 30); //P2
	rect(220,80,80,30);
	rect(340, 80, 30, 30); //T6
	rect(380,80,80,30);
	rect(20, 120, 30, 30); //T3
	rect(60,120,80,30);
	rect(180, 120, 30, 30); //P3
	rect(220,120,80,30);
	rect(340, 120, 30, 30); //Tm
	rect(380,120,80,30);
	rect(20, 160, 30, 30); //T4
	rect(60,160,80,30);
	rect(180, 160, 30, 30); //P4
	rect(220,160,80,30);
	rect(340, 160, 30, 30); //Wm
	rect(380,160,80,30);
	
	fill(0, 255, 0);
    textSize(14);
    textStyle(BOLD);
	text('T1', 35, 55); // T1
	text(round(t1,2),85,55);
	text('°C',125,55);
	text('T2', 35, 95); // T2
	text(round(t2,2),85,95);
	text('°C',125,95);
	text('T3', 35, 135); // T3
	text(round(t3,2),85,135);
	text('°C',125,135);
	text('T4', 35, 175); // T4
	text(round(t4,2),85,175);
	text('°C',125,175);
	
	text('P1', 195, 55); // P1
	text(round(p1,2),245,55);
	text('Bar',285,55);
	text('P2', 195, 95); // P2
	text(round(p2,2),245,95);
	text('Bar',285,95);
	text('P3', 195, 135); // P3
	text(round(p3,2),245,135);
	text('Bar',285,135);
	text('P4', 195, 175); // P4
	text(round(p4,2),245,175);
	text('Bar',285,175);
	
	text('T5', 355, 55); // T5
	text(round(t5,2),405,55);
	text('°C',445,55);
	text('T6', 355, 95); // T6
	text(round(t6,2),405,95);
	text('°C',445,95);
	text('Tm', 355, 135); // Tm
	text(round(torque,2),405,135);
	text('N.m',445,135);
	text('Wm', 355, 175); // Wm
	text(round(velocidadRPM,0),405,175);
	text('RPM',440,175);
	fill('black');
    textSize(14);
    text('MEDICIONES',240, 20);
	pop();

    strokeWeight(1);
    fill('black');
}

function dib_dashboard(x2, y2) {

    //Fondo Blanco - Dashboard
    fill(255);
    strokeWeight(2);
    rect(x2 , y2, 850, 660);

    //COMPRESOR ---------------------------------------------
	x_comp = 700;//valores relativos al dashboard
	y_comp = 200;
    fill(100);
    rect(x2 + x_comp-57.5, y2 + y_comp-80, 115, 9.2);
    rect(x2 + x_comp-57.5, y2 + y_comp-61.6, 115, 9.2);
    rect(x2 + x_comp-32.5, y2 + y_comp-150, 9.2, 150);
    rect(x2 + x_comp-14.1, y2 + y_comp-150, 9.2, 150);
    rect(x2 + x_comp + 4.3, y2 + y_comp-150, 9.2, 150);
    rect(x2 + x_comp+22.7, y2 + y_comp-150, 9.2, 150);

    rect(x2 + x_comp-37.5, y2 + y_comp-130, 75, 150); //Exterior Cavidad del cilindro
    rect(x2 + x_comp-52.5, y2 + y_comp+40, 100, 15); //BASE
	
    fill(255);
    rect(x2 + x_comp-37.5, y2 + y_comp-120, 75, 20); //Interior horizontal
    rect(x2+x_comp-17.5, y2 + y_comp-120, 35, 150); //Interior cavidad del cilindro

    fill(100);
    ellipse(x2 + x_comp, y2 + y_comp, 110, 110); //Exterior del cigueñal
    fill(100);
    ellipse(x2 + x_comp, y2 + y_comp, 70, 70); //Cubo del eje
    fill(0);
    ellipse(x2 + x_comp, y2 + y_comp, 20, 20); //Eje
	if(is_on){
		// Piston--------------------------------------------------------------------------
		fill(0);
        rect(x2+x_comp-12, y2+y_comp-b, 24, 24);
        if (b >= (105)) {
			up_pis = true;
        } else if (b <= (50+z)) {
			up_pis = false;
        } 
		if(up_pis){
			b = b - rotPiston;
		}else{
			b = b + rotPiston;
		}
		// Biela-Manivela
        ellipse(x_dash + x_comp + 45 * cos(theta), y_dash + y_comp + 45 * sin(theta), 10, 10);
        theta += theta_vel * rotPiston;
	}
	//MOTOR ----------------------------------------------------
	fill(0, 76, 153); //MOTOR
    rect(x2+x_comp - 15-172.5, y2+y_comp + 115-175, 60, 30);
    rect(x2+x_comp - 35-172.5, y2+y_comp + 215-175, 40, 15);
    rect(x2+x_comp + 25-172.5, y2+y_comp + 215-175, 40, 15);
    rect(x2+x_comp - 35-172.5, y2+y_comp + 142.5-175, 100, 5);
    rect(x2+x_comp - 40-172.5, y2+y_comp + 157.5-175, 110, 5);
    rect(x2+x_comp - 25-172.5, y2+y_comp + 172.5-175, 100, 5);
    rect(x2+x_comp - 40-172.5, y2+y_comp + 187.5-175, 110, 5);
    rect(x2+x_comp - 35-172.5, y2+y_comp + 202.5-175, 100, 5);
    ellipse(x2+x_comp + 15-172.5, y2+y_comp + 175-175, 105, 105); //Exterior del motor
    fill(0);
    ellipse(x2+x_comp + 15-172.5, y2+y_comp + 175-175, 20, 20); //Eje
    fill(100);
    rect(x2+x_comp - 80-172.5, y2+y_comp + 170-175, 10, 50); //Celda de carga
    rect(x2+x_comp - 90-172.5, y2+y_comp + 170-175, 80, 10); //Celda de carga
    fill(255);
    ellipse(x2+x_comp - 75-172.5, y2+y_comp + 175-175, 7, 7);
    fill(150);
    ellipse(x2+x_comp + 15-172.5, y2+y_comp + 140-175, 7, 7); //PERNOS
    ellipse(x2+x_comp + 15-172.5, y2+y_comp + 210-175, 7, 7); //PERNOS
    ellipse(x2+x_comp + 50-172.5, y2+y_comp + 175-175, 7, 7); //PERNOS
    ellipse(x2+x_comp - 20-172.5, y2+y_comp + 175-175, 7, 7); //PERNOS
    fill(0);
    push();
    translate(x2+x_comp + 15-172.5, y2+y_comp + 165-175);
    rotate(350.64);
    line(0, 0, 160, 1);
    pop();
    push();
    translate(x2+x_comp + 15-172.5, y2+y_comp + 185-175);
    rotate(8.64);
    line(0, 0, 160, 1);
    pop();
    fill(50);
    rect(x2+x_comp - 85-172.5, y2+y_comp + 210-175, 20, 20);
	push();
	translate(x2+x_comp,y2+y_comp);
	textStyle(BOLD);
	textSize(14);
	fill('black');
	text('COMPRESOR', 0, 70);
	text('MOTOR', -160, -70);
	text('CELDA DE', -250, -50);
	text('CARGA', -250, -30);

	pop();
	//CONDENSADOR-----------------------------------------------------
	strokeWeight(1);
	x_cond = 200;
	y_cond = 50;
	fill(170,215,235);
	rect(x_dash+x_cond, y_dash+y_cond, 200, 200);
	//fill(80,50,20);
	fill(235,244,250);
	rect(x_dash+x_cond+25,y_dash+y_cond, 10, 180);
	rect(x_dash+x_cond+35,y_dash+y_cond+180,30,10);
	for(let i=0;i<5;i++){
	push();
	translate(x_dash+x_cond+65,y_dash+y_cond+180-(i*2*100*sin(10)));
	rotate(-10);
	rect(0,0,100,10);
	pop();
	}
	for(let i=0;i<5;i++){
	push();
	translate(x_dash+x_cond+65,y_dash+y_cond+180-(2*100*sin(10))-(i*2*100*sin(10)));
	rotate(10);
	rect(0,0,105,10);
	pop();
	}
	
	rect(x_dash+x_cond+65,y_dash+y_cond+10,-10,-10);
	arc(x2 + x_cond+35, y2 + y_cond+180, 20, 20, 90, 180);
	arc(x2 + x_cond+65, y2 + y_cond+180, 20, 20, 80, 90);
	arc(x2 + x_cond+65, y2 + y_cond+6, 20, 20, 100, 180);
	push();
	translate(x_dash+x_cond,y_dash+y_cond);
	strokeWeight(0);
	for(let i=0;i<20;i++){
		fill(255,150-7.5*i,150-7.5*i,191);
		rect(0,i*10,200,10);
	}
	pop();
	//---------
	push();
	translate(x_dash+x_cond,y_dash+y_cond);
	rect(25,0,10,-5);//Ingreso de agua
	rect(25,-15,-50,10);
	rect(-25,-5,-10,220);
	rect(-25,455,-10,30);
	arc(25, -5, 20, 20, 270, 0);
	arc(-25, -5, 20, 20, 180, 270);
	push();//Para armar el rotametro
	fill('grey');
	rect(-40,215,20,5);
	rect(-50,220,40,5);
	rect(-50,445,40,5);
	rect(-40,450,20,5);
	fill('black');
	rect(-80,225,100,220);
	fill(235,244,250);
	rect(-70,230,80,210);
	fill('grey');
	triangle(-30,440,-60,440,-60,400);
	rect(-70,400,10,40);
	triangle(-30,440,0,440,0,400);
	rect(0,400,10,40);
	fill('black');
	rect(-45,400-int((v_agua-1.2)*25),30,20);
	triangle(-45,420-int((v_agua-1.2)*25),-15,420-int((v_agua-1.2)*25),-30,440-int((v_agua-1.2)*25));
	for(let i=1;i<17;i++){
		line(-40,400-i*10,0,400-i*10);
		text(nf(1.2+0.4*i,1,1),-58,400-i*10);
	}
	pop();
	rect(55,0,10,-30);//Salida de agua
	arc(55, -30, 20, 20, 270, 0);
	rect(55,-40,-180,10);
	arc(-125, -30, 20, 20, 180, 270);
	rect(-125,-30,-10,75);
	rect(-125,155,-10,330);
	push();//Para armar válvula de agua
	fill('black');
	triangle(-160,45,-100,45,-130,100);
	triangle(-160,155,-100,155,-130,100);
	fill('red');
	ellipse(-130,100,2*rz,2*rz);
	fill('white');
	ellipse(-130,100,2*rz-20,2*rz-20);
	fill('black');
	arc(-130,100,20,20,241.63,298.37);
	arc(-130,100,20,20,61.63,118.37);
	ellipse(-130,100,50,50);
	push();
	translate(-130,100);
	fill('red');
	rotate(angle_agua);
	rect(-rz,-5,2*rz,10);
	rect(-5,-rz,10,2*rz);
	pop();
	pop();
	fill('red');
	ellipse
	if (drag_agua) {
        dx1 = mouseX - (x_dash+x_cond-130);
        dy1 = mouseY - (y_dash+y_cond+100);
        angle_agua = atan2(dy1, dx1);
        if (oldAngle_agua < angle_agua) {
            sent_agua = 'Horario';
        } else if (oldAngle_agua > angle_agua) {
            sent_agua = 'AntiHorario';
        }
        fill(0, 153, 0);
    } else {
        fill(150);
    }
	oldAngle_agua=angle_agua;
	// Dibujo de flecha
	if(angle_agua==359 && sent_agua=='Horario'){
		angle_agua=359;
		ap_agua=0;
	}else if(angle_agua==0 && sent_agua=='AntiHorario'){
		angle_agua=0;
		ap_agua=100;
	}else{
		if(angle_agua<0){
			ap_agua = map(angle_agua,-180,0,50,0);
		}else{
			ap_agua = map(angle_agua,0,180,100,50);
		}
	}
	//v_agua = 340*ap_agua/100;
	m_agua = ap_agua+20; //medido en 10^-3 kg/s
	v_agua = (m_agua/dens_agua)*60; //Medido en litros/minuto
	push();
    translate(-130,100);
    rotate(angle_agua);
    ellipse(rz - 5, 0, 10, 10);
    pop();
	push();//TEMOPARES 5 y 6
	fill(200);
    //tERMOPAR 6
    rect(-125, 15, 5, 15);  
    rect(-120, 20, 10, 5); 
    //tERMOPAR 5
    rect(-35, 150, -5, 15); //Admisión de aire  
    rect(-40, 155, -10, 5); //Admisión de aire 
	pop();
	fill('black');
	rect(-80, 165, 30, 30); //T5

    rect(-110, -20, 30, 30); //T6

	rect(-90, 70, 30, 30); //AP_VALV_AGUA
	rect(-90,105,50,30);
	fill(0, 255, 0);
    textSize(14);
    textStyle(BOLD);
	text('T5', -65, 180); // T5


    text('T6', -95, -5); // T6


	text('AP', -75, 85); // AP_VALV_AGUA
	if(ap_agua > 0){
		text(round(ap_agua,1),-65,120);
	} else{
		text(round(0.1,1),-65,120);
	}
	textStyle(BOLD);
	textSize(14);
	fill('black');
	text('CONDENSADOR', 135, -15);
	push();
	translate(-100,315);
	rotate(-90);
    text('ROTÁMETRO (L/min)', 0, 0);
	pop();
	push();
	text('RED DE AGUA', -80, 500);
	pop(); 
	pop();//FIN DE CONDENSAOR
	//ROTAMETRO DE REFRIGERANTE---------------------------------------------------------------------
	x_rot = 300;
	y_rot = 410;
	push();//dibujo del rotametro
	translate(x_dash+x_rot,y_dash+y_rot);
	fill('grey');
	rect(-5,0,65,200);
	rect(15,-5,40,5);
	rect(15,200,40,5);
	rect(25,-10,20,5);
	rect(25,205,20,5);
	fill('red');
	rect(25,5,20,190);
	fill('grey');
	if(v_ref==0){
		ellipse(35,185,18,18);
	}else{
		ellipse(35,190-((v_ref-5)*24/5.5),18,18);
	}
	fill('black');
	for(let i=1;i<8;i++){
		line(25,190-i*24,45,190-i*24);
		text(round(5+i*5.5,2),10,190-i*24);
	}
	for(let i=1;i<8;i++){
		line(30,202-i*24,40,202-i*24);
	}
	push();
	textSize(14);
	fill('black');
	textStyle(BOLD);
	translate(-20,100);
	rotate(-90);
    text('ROTÁMETRO (L/min)', 0, 0);
	pop();
	fill(165,210,210);
	triangle(100,-30,100,-70,150,-50);
	triangle(200,-30,200,-70,150,-50);
	ellipse(150,-50,1.5*rz,1.5*rz);
	if (drag_exp) {
        dx1 = mouseX - (x_dash+x_rot+150);
        dy1 = mouseY - (y_dash+y_rot-50);
        angle_exp = atan2(dy1, dx1);
        if (oldAngle_exp < angle_exp) {
            sent_exp = 'Horario';
        } else if (oldAngle_exp > angle_exp) {
            sent_exp = 'AntiHorario';
        }
        fill('white');
    } else {
        fill(165,210,210);
    }
	oldAngle_exp=angle_exp;
	// Dibujo de cuadrado
	if(angle_exp==359 && sent_exp=='Horario'){
		angle_exp=359;
		ap_exp=0;
	}else if(angle_exp==0 && sent_exp=='AntiHorario'){
		angle_exp=0;
		ap_exp=100;
	}else{
		if(angle_exp<0){
			ap_exp = map(angle_exp,-180,0.36,50,0);
		}else{
			ap_exp = map(angle_exp,0,180,100,50);
		}
	}
	push();
	translate(150,-50);
	rotate(angle_exp);
	rect(-0.5*rz,-0.5*rz,1*rz,1*rz);
	pop();
	textStyle(BOLD);
	textSize(14);
	fill('black');
	text('V. EXPANSIÓN', 148, -10);
	//AP
	fill('black');
	rect(90, 10, 30, 30); //AP_VALV_EXP
	rect(125,10,80,30);
	fill(0, 255, 0);
    textSize(14);
    textStyle(BOLD);
	text('AP', 105, 25); // AP_VALV_EXP
	if(ap_exp> 0){
		text(round(ap_exp,1),150,25);
	}else{
		text(round(0.1,1),150,25);
	}
	text('%',180,25);
	pop();//FIN DE DIBUJO DE ROTAMETRO
	// CALORIMETRO--------------------------------------------------------------------------
	x_evap = 550;
	y_evap = 330;
	push();
	translate(x_dash+x_evap,y_dash+y_evap);
	fill(165,210,210);
	rect(0,0,200,230);
	fill('blue');
	rect(0,20,30,10);
	
	for(let i=0;i<4;i++){
	push();
	translate(30,20+(i*2*100*sin(10)));
	rotate(10);
	fill(50*i,50*i,255);
	rect(0,0,100,10);
	pop();
	}
	for(let i=0;i<4;i++){
	push();
	translate(30,20+(2*100*sin(10))+(i*2*100*sin(10)));
	rotate(-10);
	fill(50*i,50*i,255);
	rect(0,0,105,10);
	pop();
	}
	fill(150,150,255);
	rect(30,160,130,10);
	arc(160,160,20,20,0,90);
	rect(160,160,10,-130);
	arc(170,30,20,20,180,270);
	rect(170,20,30,10);
	
	fill(255,255-pot*255/1500,255-pot*255/1500);
	rect(30,230,5,-50);
	rect(30,230,5,40);
	rect(170,230,5,-50);
	rect(170,230,5,40);
	for(let i=0;i<10;i++){
	push();
	translate(35+(i*2*40*sin(10)),180);
	rotate(80);
	rect(0,0,40,5);
	pop();
	}
	for(let i=0;i<10;i++){
	push();
	translate(35+(2*40*sin(10))+(i*2*40*sin(10)),180);
	rotate(100);
	rect(0,0,40,5);
	pop();
	}
	fill('black');
	rect(45, 250, 30, 30); //Potencia
	rect(80,250,80,30);
	fill(0, 255, 0);
    textSize(14);
    textStyle(BOLD);
	text('We', 60, 265); // Potencia
	text(round(pot,1),105,265);
	text('W',145,265);
	push();
    var i;
    translate(-85, 250);
    rotate(135);
    strokeWeight(2);
    line(0, 0, 50, 0);
    for(i = 1; i < 5; i++){
      rotate(67.5);
      strokeWeight(2);
      line(0, 0, 50, 0);
    }
    pop();
	textStyle(NORMAL);
	strokeWeight(1);
	fill(200);
	rect(140,0,15,-5);//TKcal
	rect(145,-5,5,-10);
	rect(145,0,5,90);
	push();
	strokeWeight(0);
	fill(165,210,210,191);
	rect(0,0,200,230);
	pop();
	
	fill(110);
    strokeWeight(3);
    ellipse(-85, 250, rz * 2, rz * 2);
	if (drag_pot) {
        dx3 = mouseX - (x_dash+x_evap -85);
        dy3 = mouseY - (y_dash+y_evap +250);
        angle_pot = atan2(dy3, dx3);
        if (oldAngle_pot < angle_pot) {
            sent_pot = 'Horario';
        } else if (oldAngle_pot > angle_pot) {
            sent_pot = 'AntiHorario';
        }
        fill(0, 153, 0);
    } else {
        fill(150);
    }
	if (angle_pot >= 135 && angle_pot <= 180) { // Zona 1
        //if (angle >= 0.75 * PI && angle <= PI && sent != 'Horario') { // Zona 1
        pot = map(angle_pot, 135, 180, 0, 250);

    } else if (angle_pot <= 0 && angle_pot >= -180) { // Zona 2
        pot = map(angle_pot, -180, 0, 250, 1250);

    } else if (angle_pot >= 0 && angle_pot <= 45) { // Zona 3
        //} else if (angle >= 0 && angle <= 0.25 * PI && sent != 'AntiHorario') { // Zona 3
        pot = map(angle_pot, 0, 45, 1250, 1500);

    } else if (angle_pot > 45 && angle_pot < 135) {
        if (sent_pot === 'Horario') {
            angle_pot = 45;
            pot = 1500;
        } else if (sent_pot === 'AntiHorario') {
            angle_pot = 135;
            pot = 0;
        }
    }
	push();
    translate(-85, 250);
    rotate(angle_pot);
    ellipse(rz - 15, 0, 10, 10);
    pop();
	fill('black'); 
    textSize(12);
    textStyle(NORMAL);
    text('0', -85+ 65 * cos(135), 250 + 65 * sin(135));
    text('375', -85 + 65 * cos(202.5), 250 + 65 * sin(202.5));
    text('750', -85 + 65 * cos(270), 250 + 65 * sin(270));
    text('1125', -85 + 65 * cos(337.5), 250 + 65 * sin(337.5));
	text('1500', -85 + 65 * cos(45), 250 + 65 * sin(45));
	oldAngle_pot=angle_pot;
	textStyle(BOLD);
	textSize(14);
	fill('black');
	text('POTENCIA', -85, 315);
	text('CALORÍMETRO', 60, -10);
	rect(112, -50, 30, 30); //T1
	rect(152,-50,80,30);
	fill(0, 255, 0);
    textSize(14);
    textStyle(BOLD);
	text('Tc', 127, -35); // T1
	text(round(t_cal,2),175,-35);
	text('°C',215,-35);
	pop();// FIN DE CALORIMETRO
	//DIBUJO DE TUBERIAS------------------------------------------------------------------------------------
	push();
	translate(x_dash,y_dash);
	//Comenzando con la salida del evaporador
	fill(150,150,255);
	rect(750,350,50,10);
	arc(800,350,20,20,0,90);
	rect(800,350,10,-255);
	arc(800,95,20,20,270,360);
	rect(800,95,-65,-10);
	//Comenzando con la salida del compresor
	fill(255,150,150);
	rect(665,95,-65,-10);
	arc(600,85,20,20,90,180);
	rect(590,85,10,-25);
	arc(590,60,20,20,270,360);
	rect(590,60,-190,-10);
	//Comenzando con la salida del condensador
	fill(255,0,0);
	rect(230,250,10,390);
	arc(240,640,20,20,90,180);
	rect(240,640,90,10);
	arc(330,640,20,20,0,90);
	rect(330,640,10,-20);
	//Comenzando en la salida del rotametro de refrigerante
	rect(330,400,10,-40);
	arc(340,360,20,20,180,270);
	rect(340,360,60,-10);
	//Entre vlavula de expansion y evaporador
	fill(0,0,255);
	rect(500,360,50,-10);
	//Termopares
	fill(200);
	rect(420,50,15,-5);//TK2
	rect(425,45,5,-10);
	rect(510,350,15,-5);//TK4
	rect(515,345,5,-10);
	rect(760,85,15,-5);//TK1
	rect(765,80,5,-10);
	rect(240,290,5,15);//TK3
	rect(245,295,10,5);

	//Indicadores
	fill('black');
	rect(250, 260, 30, 30); //T3
	rect(490, 300, 30, 30); //T4
	rect(440, 5, 30, 30); //T2
	rect(755, 35, 30, 30); //T1
	fill(0, 255, 0);
    textSize(14);
    textStyle(BOLD);
	text('3', 265, 275); // T3
	text('4', 505, 315); // T4
	text('2', 455, 20); // T2
	text('1', 770,50); // T1


	pop();
	push();
	//Indicadores de flujo
	fill('black');
	rect(100, 850, 30, 30); //Caudal agua
	rect(140,850,90,30);
	
	rect(100, 890, 30, 30); //Caudal ref
	rect(140,890,90,30);

	
	fill(0, 255, 0);
    textSize(14);
    textStyle(BOLD);
	text('Va', 115, 865); // caudal agua
	text(round(v_agua,2),165,865);
	text('Lpm',205,865);
	
	text('Vr', 115, 905); // caudal refrigerante
	text(round(v_ref,2),165,905);
	text('Lph',205,905);

	pop();

	
	strokeWeight(2);
    fill('black');
    textStyle(NORMAL);
}