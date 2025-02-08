import { ObjectoCurso } from "./Curso.model";


export const fetchCursoID = (id: number) => {
    const curso: ObjectoCurso[] = [
        {
            id: 1,
            grupo: 1,
            titulo: "Inglés A1: Introducción al Idioma",
            descripcion: "Este curso es el primer paso en tu viaje para aprender inglés. Diseñado para principiantes, te ayudará a adquirir los fundamentos esenciales del idioma, desde el alfabeto y los saludos básicos hasta las primeras estructuras gramaticales. Aprenderás a comunicarte en situaciones cotidianas sencillas, como presentarte, preguntar direcciones y hablar sobre tus gustos y rutinas.",
            progreso: 0,
            instructor: [{
                id: 1,
                nombre: "Juan Pérez",
                titulo: "Ingeniero en Educación y Lengua Inglesa",
                descripcion: "Licenciado en Educación y Lengua Inglesa con más de 10 años de experiencia en la enseñanza del inglés. Apasionado por guiar a los estudiantes en su proceso de aprendizaje, ayudándoles a desarrollar habilidades lingüísticas sólidas y a alcanzar sus metas académicas. Su enfoque pedagógico está basado en la comprensión y el crecimiento de cada estudiante..",
                foto: "https://media.licdn.com/dms/image/C4D03AQGy-l0wlpFXiA/profile-displayphoto-shrink_800_800/0/1554677907835?e=2147483647&v=beta&t=KcmKFvahTadhxM1_u7YCbAqkGLYKXAoxTnnSqfzWYdw"
            }],
            drive: "https://drive.google.com/drive/folders/1xzuISdO3S9n5642Q0kLhmULCuH7lEbTa",
            modulos: [
                {
                    id: 1,
                    nombre: "Introducción completa al inglés básico para niños y niñas de todas las edades",
                    temas: [
                        {
                            id: 1,
                            titulo: "Cómo saludar en inglés de manera correcta y educada",
                            videoUrl: "https://www.youtube.com/watch?v=8M8Wamg__bY",
                            descripcion: `
                            <p>Este tema introduce los fundamentos del modelado poligonal, la t&eacute;cnica m&aacute;s utilizada en la creaci&oacute;n de activos 3D para videojuegos. Se exploran conceptos como topolog&iacute;a, geometr&iacute;a y mallas, y c&oacute;mo estos elementos se combinan para dar forma a objetos en un espacio tridimensional. Adem&aacute;s, se abordan pr&aacute;cticas recomendadas para construir modelos eficientes y detallados.</p>
                            <p>&nbsp;</p>
                            <p><img class=" nofocus" tabindex="0" role="button" src="https://th.bing.com/th/id/R.9266b9c455ec8b41cbb53ea1ba84973f?rik=cZqIZB1ttlj8Cg&amp;pid=ImgRaw&amp;r=0" alt="Modelado poligonal parte 3 - Tutorial de modelado esencial" aria-label="Modelado poligonal parte 3 - Tutorial de modelado esencial"></p>
                            <p>Este tema se centra en los materiales PBR (Renderizado Basado en F&iacute;sica), una t&eacute;cnica avanzada para crear materiales realistas que reaccionan a la luz de forma natural. Los estudiantes aprender&aacute;n a aplicar y ajustar propiedades como la reflectancia y la rugosidad, logrando efectos visuales impresionantes que mejoran la calidad de los modelos en entornos de videojuegos. <strong>Video sugerido</strong>: Un video como <em>"PBR Materials Explained: Physically Based Rendering in Games"</em> o <em>"Creating PBR Materials in Substance Painter"</em> puede ser &uacute;til para demostrar c&oacute;mo funcionan los materiales PBR y su impacto en la apariencia y el realismo de los modelos.</p> `,
                            tiempoAporbar: 10,
                            aprobado: false,
                        },
                        {
                            id: 2,
                            titulo: "Aprendiendo a contar: Números del 1 al 100",
                            videoUrl: "",
                            descripcion: `
                            <p>Contar en inglés es una habilidad esencial para actividades cotidianas como decir tu edad, leer precios, o dar tu número telefónico. En este tema aprenderás a dominar los números del 1 al 100 de forma clara y divertida.</p>
                        <img src="https://www.openenglish.com.br/blog/wp-content/uploads/sites/20/2022/11/atp-23288-numbers-in-english-image.png" alt="Números en inglés" />
                        <p><strong>Estructura de los números:</strong></p>
                        <ul>
                            <li>Del 1 al 20 tienen formas únicas que debes memorizar.</li>
                            <li>A partir del 21, los números se forman combinando las decenas y las unidades (por ejemplo: “twenty-one”).</li>
                            <li>Las decenas principales son: 10 (ten), 20 (twenty), 30 (thirty), hasta 100 (one hundred).</li>
                        </ul>
                        <p><strong>Tabla de números básicos:</strong></p>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>Número</th>
                                    <th>Inglés</th>
                                    <th>Español</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>One</td>
                                    <td>Uno</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>Ten</td>
                                    <td>Diez</td>
                                </tr>
                                <tr>
                                    <td>21</td>
                                    <td>Twenty-one</td>
                                    <td>Veintiuno</td>
                                </tr>
                                <tr>
                                    <td>50</td>
                                    <td>Fifty</td>
                                    <td>Cincuenta</td>
                                </tr>
                                <tr>
                                    <td>100</td>
                                    <td>One hundred</td>
                                    <td>Cien</td>
                                </tr>
                            </tbody>
                        </table>
                        <p><strong>Actividades sugeridas:</strong></p>
                        <ol>
                            <li>Cuenta objetos en tu casa o escuela en inglés.</li>
                            <li>Practica escribiendo los números del 1 al 100.</li>
                            <li>Juega a identificar números en anuncios o letreros.</li>
                        </ol>
                        <p>Conocer los números en inglés te abrirá muchas puertas en el aprendizaje del idioma y en situaciones reales. 
                        <a href="https://www.ef.com/wwen/english-resources/english-grammar/numbers/" target="_blank" rel="noopener noreferrer">Haz clic aquí para explorar más sobre los números en inglés.</a></p>

                            `,
                            tiempoAporbar: 10,
                            aprobado: false,
                        },
                        {
                            id: 3,
                            titulo: "Conociendo el abecedario inglés: pronunciación y escritura",
                            videoUrl: "https://www.youtube.com/watch?v=PmqHaAW-kf4",
                            descripcion: `
                    <p>El abecedario es la base del aprendizaje del idioma. Este tema te ayudará a familiarizarte con la pronunciación correcta y la escritura de cada letra.</p>
                    <img src="https://th.bing.com/th/id/OIP.gLWLJ0XSn3Dvp3JMqHW1EAHaGb?rs=1&pid=ImgDetMain" alt="Abecedario en inglés" />
                    <p><strong>Aspectos clave:</strong></p>
                    <ul>
                        <li>Aprender las letras y sus sonidos en inglés.</li>
                        <li>Prácticas para deletrear palabras comunes.</li>
                        <li>Ejercicios para escribir frases simples utilizando el abecedario.</li>
                    </ul>
                    <p><strong>Consejos prácticos:</strong></p>
                    <ol>
                        <li>Escucha canciones del abecedario para reforzar el aprendizaje.</li>
                        <li>Utiliza flashcards para practicar la escritura y pronunciación.</li>
                        <li>Deletrea tu nombre y palabras conocidas en inglés.</li>
                    </ol>
                    <p>Dominar el abecedario te permitirá leer y escribir en inglés con mayor confianza.</p>
                    `,
                            tiempoAporbar: 10,
                            aprobado: false,
                        },
                    ],
                    quizz: [{
                        id: 1,
                        titulo: "Quiz introductorio",
                        descripcion: "Evalúa tus conocimientos básicos de inglés.",
                        realizado: false,
                        calificacion: 0,
                        preguntas: [
                            {
                                id: 1,
                                texto: "¿Cómo se dice 'Hola' en inglés?",
                                opciones: [
                                    { id: 1, texto: "Hello", correcta: true },
                                    { id: 2, texto: "Hi", correcta: false },
                                    { id: 3, texto: "Goodbye", correcta: false },
                                    { id: 4, texto: "Thanks", correcta: false },
                                ],
                            },
                            {
                                id: 2,
                                texto: "¿Qué significa 'Goodbye'?",
                                opciones: [
                                    { id: 1, texto: "Hola", correcta: false },
                                    { id: 2, texto: "Gracias", correcta: false },
                                    { id: 3, texto: "Adiós", correcta: true },
                                    { id: 4, texto: "Por favor", correcta: false },
                                ],
                            },
                        ],
                    }],
                    aprobado: false,
                    visible: true,
                },
                {
                    id: 2,
                    nombre: "Gramática básica para principiantes: construyendo frases simples",
                    temas: [
                        {
                            id: 4,
                            titulo: "Entendiendo y usando pronombres en inglés",
                            videoUrl: "https://www.youtube.com/watch?v=jmfciUeAnZw",
                            descripcion: `
                    <p>Los pronombres son esenciales para formar oraciones y evitar repeticiones innecesarias en el idioma inglés.</p>
                    <img src="https://www.abcfichas.com/wp-content/uploads/2021/06/Los-Pronombres-Personales-en-Ingles.jpg" alt="Uso de pronombres en inglés" />
                    <p><strong>Tipos de pronombres:</strong></p>
                    <ul>
                        <li><strong>Personales:</strong> I, you, he, she, it, we, they.</li>
                        <li><strong>Posesivos:</strong> mine, yours, his, hers, ours, theirs.</li>
                        <li><strong>Demostrativos:</strong> this, that, these, those.</li>
                    </ul>
                    <p><strong>Actividades sugeridas:</strong></p>
                    <ol>
                        <li>Identifica pronombres en textos sencillos en inglés.</li>
                        <li>Completa oraciones utilizando el pronombre correcto.</li>
                        <li>Crea tus propias oraciones usando pronombres diversos.</li>
                    </ol>
                    <p>El uso adecuado de pronombres hará que tu comunicación en inglés sea más fluida y precisa.</p>
                    `,
                            tiempoAporbar: 20,
                            aprobado: false,
                        },
                        {
                            id: 5,
                            titulo: "Todo sobre el verbo 'to be': uso y ejemplos prácticos",
                            videoUrl: "https://www.youtube.com/watch?v=WZ57H4MtTLo",
                            descripcion: `
                    <p>El verbo "to be" es fundamental en inglés y tiene múltiples usos, desde describir hasta identificar.</p>
                    <img src="https://www.transtle.com/wp-content/uploads/2021/05/Verbo-to-be-en-ingles-conjugacion-y-pronunciacion-ingles-y-espanol-768x459.png" alt="Ejemplos del verbo to be" />
                    <p><strong>Usos principales:</strong></p>
                    <ul>
                        <li>Describir estados o condiciones: "I am happy".</li>
                        <li>Identificar personas o cosas: "She is a teacher".</li>
                        <li>Expresar ubicaciones: "We are at school".</li>
                    </ul>
                    <p><strong>Consejos prácticos:</strong></p>
                    <ol>
                        <li>Practica conjugaciones en afirmativo, negativo e interrogativo.</li>
                        <li>Haz ejercicios de traducción para afianzar el aprendizaje.</li>
                        <li>Úsalo en oraciones simples para describir tu entorno.</li>
                    </ol>
                    <p>Dominar el verbo "to be" te permitirá formar oraciones fundamentales en inglés.</p>
                    `,
                            tiempoAporbar: 1,
                            aprobado: false,
                        },
                        {
                            id: 6,
                            titulo: "Cómo formar oraciones simples para comunicarse fácilmente",
                            videoUrl: "",
                            descripcion: "",
                            tiempoAporbar: 10,
                            aprobado: false,
                        },
                    ],
                    quizz: [{
                        id: 2,
                        titulo: "Quiz # 2",
                        descripcion: "Este quiz evalúa tu comprensión sobre la estructura básica de las frases en inglés, específicamente en cómo formar oraciones afirmativas, negativas y preguntas.",
                        realizado: false,
                        calificacion: 0,
                        preguntas: [
                            {
                                id: 1,
                                texto: "¿Cómo se construye una frase afirmativa en inglés con el sujeto 'I' y el verbo 'to be'?",
                                opciones: [
                                    { id: 1, texto: "La frase correcta sería: 'I am happy.' Esto indica que el sujeto 'I' está unido al verbo 'am' que es la forma del verbo 'to be' para la primera persona del singular.", correcta: true },
                                    { id: 2, texto: "La opción 'I am happy you.' no es correcta porque tiene una estructura incompleta y agrega una palabra innecesaria al final.", correcta: false },
                                    { id: 3, texto: "La opción 'Happy I am.' es incorrecta, ya que aunque las palabras son correctas, el orden de las palabras no sigue la estructura típica de una frase afirmativa en inglés.", correcta: false },
                                    { id: 4, texto: "La frase 'I aming happy.' es gramaticalmente incorrecta, ya que 'aming' no es una forma válida del verbo 'to be' en inglés.", correcta: false },
                                ],
                            },
                            {
                                id: 2,
                                texto: "En inglés, ¿cómo se forma una pregunta con el verbo 'to be' en el presente simple?",
                                opciones: [
                                    { id: 1, texto: "La opción correcta es: 'Are you happy?'. Esta es la estructura básica para hacer una pregunta en presente simple usando el verbo 'to be'. El verbo va antes del sujeto.", correcta: true },
                                    { id: 2, texto: "La frase 'You are happy?' es incorrecta porque el orden de las palabras no corresponde a la estructura estándar de una pregunta en inglés.", correcta: false },
                                    { id: 3, texto: "La opción 'Happy are you?' no es válida, ya que el adjetivo 'happy' debería ir después del verbo 'are', siguiendo la estructura correcta para preguntas.", correcta: false },
                                    { id: 4, texto: "La opción 'Are happy you?' tiene un orden incorrecto de las palabras, lo que la hace gramaticalmente incorrecta en inglés.", correcta: false },
                                ],
                            },
                            {
                                id: 3,
                                texto: "¿Cómo se usa el verbo 'to have' en una frase negativa?",
                                opciones: [
                                    { id: 1, texto: "La forma correcta es: 'I don't have a car.' En inglés, usamos 'don't' para hacer una negación con el verbo 'have' en el presente simple.", correcta: true },
                                    { id: 2, texto: "La opción 'I have not a car.' es incorrecta porque en inglés la negación con 'have' se forma con 'don't have' y no con 'have not'.", correcta: false },
                                    { id: 3, texto: "La opción 'Not I have a car.' es gramaticalmente incorrecta, ya que el orden de las palabras no sigue la estructura correcta para una frase negativa en inglés.", correcta: false },
                                    { id: 4, texto: "La frase 'I not have a car.' también es incorrecta porque en inglés la negación del verbo 'have' se debe hacer usando 'don't' antes del verbo.", correcta: false },
                                ],
                            },
                            {
                                id: 4,
                                texto: "¿Qué oración está correctamente estructurada en inglés?",
                                opciones: [
                                    { id: 1, texto: "La opción correcta es: 'She is going to the store tomorrow.' Esta es una oración afirmativa que sigue el orden correcto de palabras en inglés, con el sujeto 'she', el verbo 'is' y el verbo principal 'going'.", correcta: true },
                                    { id: 2, texto: "La opción 'She tomorrow is going to the store.' es incorrecta porque el adverbio de tiempo 'tomorrow' debe ir al final de la frase o después del verbo 'is'.", correcta: false },
                                    { id: 3, texto: "La frase 'Going to the store she is tomorrow.' tiene un orden incorrecto de las palabras y no sigue la estructura gramatical correcta.", correcta: false },
                                    { id: 4, texto: "La opción 'She tomorrow to the store going is.' es incorrecta debido a la colocación errónea de las palabras, lo que hace que la frase suene rara y gramaticalmente incorrecta.", correcta: false },
                                ],
                            },
                            {
                                id: 5,
                                texto: "¿Cómo se forma una pregunta en inglés usando el verbo 'do' para el sujeto 'they'?",
                                opciones: [
                                    { id: 1, texto: "La opción correcta es: 'Do they like pizza?'. Aquí, 'do' se coloca antes del sujeto 'they' para formar la pregunta en presente simple.", correcta: true },
                                    { id: 2, texto: "La frase 'They do like pizza?' es incorrecta porque el verbo 'do' debe ir antes del sujeto 'they' para formar correctamente una pregunta en inglés.", correcta: false },
                                    { id: 3, texto: "La opción 'Pizza do they like?' no es válida porque en inglés el sujeto debe ir antes del verbo en una pregunta, no después del objeto.", correcta: false },
                                    { id: 4, texto: "La frase 'Like they do pizza?' tiene un orden incorrecto de las palabras, lo que la hace gramaticalmente incorrecta en inglés.", correcta: false },
                                ],
                            },
                        ],
                    }],
                    aprobado: false,
                    visible: false,
                },
                {
                    id: 3,
                    nombre: "Vocabulario para el día a día: palabras esenciales en inglés",
                    temas: [
                        {
                            id: 7,
                            titulo: "Objetos comunes que encontramos en el hogar",
                            videoUrl: "url_del_video_aqui", // Agregar el enlace al video
                            descripcion: `
                                <p>En este tema aprenderás el vocabulario necesario para identificar y nombrar los objetos más comunes que encontramos en nuestro hogar, como <strong>muebles</strong>, <strong>utensilios de cocina</strong>, <strong>electrodomésticos</strong> y <strong>objetos personales</strong>.</p>
                                <p>A través de ejercicios prácticos y ejemplos de situaciones cotidianas, adquirirás la habilidad para hablar con fluidez sobre los elementos que te rodean en tu vida diaria.</p>
                                <p>Al final, serás capaz de describir tu entorno doméstico en inglés de manera natural.</p>
                                <img src="https://example.com/imagen_objetos_hogar.jpg" alt="Objetos comunes en el hogar" />
                            `,
                            tiempoAporbar: 10,
                            aprobado: false,
                        },
                        {
                            id: 8,
                            titulo: "Nombres de ropa y accesorios más utilizados",
                            videoUrl: "url_del_video_aqui", // Agregar el enlace al video
                            descripcion: `
                                <p>En este tema aprenderás cómo nombrar las prendas de ropa y los <strong>accesorios</strong> que usamos todos los días.</p>
                                <p>Estudiarás vocabulario relacionado con prendas como <strong>pantalones</strong>, <strong>camisas</strong>, <strong>zapatos</strong>, y accesorios como <strong>sombreros</strong>, <strong>bufandas</strong>, <strong>joyas</strong>, y más.</p>
                                <p>Este tema te permitirá hablar sobre tu estilo personal y expresar preferencias sobre ropa en conversaciones cotidianas.</p>
                                <img src="https://example.com/ropa_accesorios.jpg" alt="Ropa y accesorios" />
                            `,
                            tiempoAporbar: 10,
                            aprobado: false,
                        },
                        {
                            id: 9,
                            titulo: "Medios de transporte y cómo describirlos en inglés",
                            videoUrl: "url_del_video_aqui", // Agregar el enlace al video
                            descripcion: `
                                <p>En este tema aprenderás a identificar y describir los diferentes <strong>medios de transporte</strong>, tanto públicos como privados, como <strong>autobuses</strong>, <strong>trenes</strong>, <strong>aviones</strong>, <strong>bicicletas</strong> y <strong>coches</strong>.</p>
                                <p>Estudiarás cómo hablar sobre las características de estos medios, cómo usarlos en oraciones y cómo describir tu experiencia de viajar.</p>
                                <p>Este vocabulario es muy útil cuando necesitas moverte por la ciudad o viajar a diferentes lugares.</p>
                                <ul>
                                    <li><strong>Autobús:</strong> "I take the bus to work."</li>
                                    <li><strong>Tren:</strong> "The train is fast and comfortable."</li>
                                    <li><strong>Coche:</strong> "I prefer to drive my car."</li>
                                </ul>
                                <img src="https://example.com/medios_transporte.jpg" alt="Medios de transporte" />
                            `,
                            tiempoAporbar: 10,
                            aprobado: false,
                        },
                    ],
                    quizz: [], // Aquí puedes agregar el quiz asociado a este módulo
                    aprobado: false,
                    visible: false,
                },

            ],
            aprobado: false,
            finalizado: false,
        },
        {
            id: 2,
            grupo: 2,
            titulo: "Inglés A2: Expresiones y Conversaciones Cotidianas",
            descripcion: "Este curso está diseñado para estudiantes que ya tienen una base en inglés y desean profundizar en expresiones y conversaciones que usan los hablantes nativos en situaciones cotidianas. Aprenderás a comunicarte con mayor fluidez en situaciones como hacer compras, pedir comida en un restaurante, y dar opiniones sobre actividades cotidianas.",
            progreso: 0,
            instructor: [{
                id: 2,
                nombre: "Ana González",
                titulo: "Licenciada en Lenguas Extranjeras",
                descripcion: "Profesora con más de 10 años de experiencia en la enseñanza del inglés. Apasionada por ayudar a los estudiantes a alcanzar su máximo potencial y lograr sus objetivos lingüísticos.",
                foto: "https://media.licdn.com/dms/image/C4D03AQEewhkFqqLygQ/profile-displayphoto-shrink_800_800/0/1659373587242?e=2147483647&v=beta&t=Bla3MLdF_Wg5tw3iqO_dnEZ7BnzC4l0mXDm7hMqH5X4"
            }],
            drive: "https://drive.google.com/drive/folders/1aIzB5mXJxRhP7pVKTQhRi1QtVYyq-oYf",
            modulos: [
                {
                    id: 1,
                    nombre: "Compras y Pedidos: Práctica de expresiones comunes",
                    temas: [
                        {
                            id: 1,
                            titulo: "Pedir en un restaurante: Expresiones útiles",
                            videoUrl: "https://www.youtube.com/watch?v=v01wDBubtfg",
                            descripcion: `
                                <p>Aprende a pedir comida, bebidas y hacer solicitudes especiales en inglés en un restaurante. Estudia frases como “Can I have...?” y “I would like...”.</p>
                                <img src="https://example.com/restaurant.jpg" alt="Pedir en un restaurante en inglés" />
                                <p><strong>Consejos prácticos:</strong></p>
                                <ul>
                                    <li>Escucha las interacciones entre meseros y clientes en restaurantes.</li>
                                    <li>Practica cómo hacer peticiones educadas y respuestas comunes.</li>
                                </ul>
                            `,
                            tiempoAporbar: 10,
                            aprobado: false,
                        },
                        {
                            id: 2,
                            titulo: "Haciendo compras: Vocabulario y frases esenciales",
                            videoUrl: "",
                            descripcion: `
                                <p>Domina el vocabulario básico necesario para hacer compras en tiendas y mercados, incluyendo cómo preguntar precios, tamaños y colores.</p>
                                <img src="https://example.com/shopping.jpg" alt="Haciendo compras en inglés" />
                                <p><strong>Vocabulario clave:</strong></p>
                                <ul>
                                    <li>How much is this?</li>
                                    <li>Do you have this in another size?</li>
                                    <li>I’m just looking, thank you.</li>
                                </ul>
                            `,
                            tiempoAporbar: 10,
                            aprobado: false,
                        },
                    ],
                    quizz: [],
                    aprobado: false,
                    visible: true,
                },
                {
                    id: 2,
                    nombre: "Opiniones y Sentimientos: Expresiones para la vida diaria",
                    temas: [
                        {
                            id: 3,
                            titulo: "Dar opiniones: Gustos y preferencias",
                            videoUrl: "https://www.youtube.com/watch?v=tv9J5ZG10f0",
                            descripcion: `
                                <p>Aprende a expresar tus gustos y preferencias en inglés usando frases como “I love...” y “I don't like...”.</p>
                                <img src="https://example.com/opinions.jpg" alt="Dar opiniones en inglés" />
                                <p><strong>Consejos prácticos:</strong></p>
                                <ul>
                                    <li>Practica cómo decir si te gusta o no algo en situaciones sociales.</li>
                                    <li>Escucha canciones y programas de TV en inglés para familiarizarte con las expresiones comunes.</li>
                                </ul>
                            `,
                            tiempoAporbar: 10,
                            aprobado: false,
                        },
                        {
                            id: 4,
                            titulo: "Expresando emociones y sentimientos",
                            videoUrl: "https://www.youtube.com/watch?v=0qF3mNqLf0A",
                            descripcion: `
                                <p>Domina las frases y vocabulario para expresar tus emociones y sentimientos en diferentes contextos, como “I’m happy” o “I’m worried”.</p>
                                <img src="https://example.com/emotions.jpg" alt="Expresando emociones en inglés" />
                                <p><strong>Frases útiles:</strong></p>
                                <ul>
                                    <li>I'm excited about...</li>
                                    <li>I'm feeling a bit down today.</li>
                                    <li>It makes me happy to...</li>
                                </ul>
                            `,
                            tiempoAporbar: 10,
                            aprobado: false,
                        },
                    ],
                    quizz: [],
                    aprobado: false,
                    visible: true,
                },
            ],
            aprobado: false,
            finalizado: false,
        }
    ]
    const cursoEncontrado = curso.find(curso => curso.id === id);
    return cursoEncontrado ? [cursoEncontrado] : [];
};