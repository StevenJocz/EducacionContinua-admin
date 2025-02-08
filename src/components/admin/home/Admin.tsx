'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, Tooltip, YAxis, PieChart, Pie, Cell, Legend } from "recharts";
import { Widget } from '../widget';
import style from './Admin.module.css';
import { IoEyeOutline, IoReload } from 'react-icons/io5';
import { fetchWidget } from './Admin.service';
import { ObjectWidget } from './Admin.model';

const Admin = () => {
  const [isClient, setIsClient] = useState(false);
  const [widget, setWidget] = useState<ObjectWidget>();

  useEffect(() => {
    setIsClient(true);
    handleWidget();
  }, []);


  const handleWidget = async () => {
    const Widget = await fetchWidget();
    setWidget(Widget);
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#d0ed57'];

  return (
    <div className={style.Admin}>
      <div className={style.Admin_Encabezado}>
        <div>
          <h1>¡Hola, <span>Steven Jocz!</span></h1>
          <p>¡Bienvenid@! al panel administrador</p>
        </div>
        <IoReload
          className={style.Admin_Encabezado_Icono}
          onClick={handleWidget}

        />
      </div>

      {isClient && (
        <>
          <div className={style.Admin_Widget}>
            <div className={style.Admin_Widget_Left}>
              <Widget widgetData={widget?.total} />
            </div>
            <div className={style.Admin_Widget_Right}>
              <h2>Evolución de las inscripciones mes a mes</h2>

              <AreaChart
                width={650}
                height={300}
                data={widget?.inscripciones}
                margin={{ top: 20, right: 0, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" tick={{ fill: "#C4DAD2", fontFamily: "Barlow Condensed" }} />
                <YAxis tick={{ fill: "#C4DAD2", fontFamily: "Barlow Condensed" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#333',
                    borderRadius: '5px',
                    padding: '10px',
                    fontFamily: 'Barlow Condensed',
                    color: 'white',
                  }}
                  labelStyle={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                  itemStyle={{
                    color: '#C4DAD2',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="inscripciones"
                  stroke="#282641"
                  fill="#8884d8"
                />
              </AreaChart>

            </div>
          </div>
          <div className={style.Admin_Widget_Bottom}>
            <div className={style.Admin_Widget_Bottom_Left}>
              <h2>Inscripciones por Curso</h2>
              <PieChart width={400} height={300}>
                <Pie
                  dataKey="valor"
                  data={widget?.cursos}
                  fill="#8884d8"
                  label
                  innerRadius={50}  // Ajusta el radio interno para un "donut chart"
                  outerRadius={100}
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                  }}
                >
                  {widget?.cursos.map((curso, index) => (
                    <Cell key={`${curso.nombre}-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ payload }) => {
                    if (!payload || payload.length === 0) return null;
                    const curso = payload[0].payload; // Accede al objeto completo del curso
                    return (
                      <div
                        style={{
                          backgroundColor: '#333',
                          borderRadius: '5px',
                          padding: '10px',
                          fontFamily: 'Barlow Condensed',
                          color: 'white',
                        }}
                      >
                        <strong style={{ fontSize: '14px' }}>{curso?.nombre}</strong>
                        <div style={{ color: '#C4DAD2', fontSize: '12px' }}>
                          {`Valor: ${curso?.valor}`}
                        </div>
                      </div>
                    );
                  }}
                />
                <Legend
                  wrapperStyle={{ fontFamily: "Barlow Condensed, sans-serif" }}
                  formatter={(value, entry, index) => {
                    // Personaliza cómo se muestra la leyenda
                    const course = widget?.cursos[index];
                    return `${course?.nombre}: ${course?.valor}`;  // Muestra el nombre y valor del curso
                  }}
                />
              </PieChart>
            </div>
            <div className={style.Admin_Widget_Bottom_Right}>
              <h2>Inscripciones recientes</h2>
              {widget?.dataInscripciones.map((inscripcion) => (
                <div className={style.Card_Inscripcion} key={inscripcion.id}>
                  <div className={style.Card_Inscripcion_Info}>
                    <h3>{inscripcion.nombre}</h3>
                    <h5>{inscripcion.fecha}</h5>
                    <h4>{inscripcion.curso}</h4>
                  </div>
                  <div className={style.Card_Inscripcion_Accion}>
                    <h3 className={`${style[inscripcion.estado]}`}>{inscripcion.estado}</h3>
                    <IoEyeOutline className={style.Icono} />
                  </div>
                </div>
              ))}

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
