import { Editor } from '@tinymce/tinymce-react';
import style from './ItemsConversacion.module.css'

interface Props {
    idCurso: number;
    idGrupo: number;
    onClose: () => void;
}
const AddConversacion: React.FC<Props> = ({ idCurso, idGrupo, onClose }) => {
    return (
        <div className={style.AddConversacion}>
            <Editor
                apiKey='tuezbpkp2ehsxvmrxtl2szjjtayo5yx9fm90xwbjrpbvopkv'
                init={{
                    height: 200,
                    menubar: false,

                    plugins: [
                        'lists',
                        'image' // Plugin para manejo de imágenes
                    ],
                    content_style: `
                    
                    img {
                        width: 100% !important;
                        max-width: 600px;
                        height: auto !important;
                        border-radius: 2px;
                        margin: 0 auto;
                        display: block;
                        }
                    `,
                    toolbar: 'formatselect bold italic underline strikethrough alignleft aligncenter alignright bullist', // Botones de la barra de herramientas
                    paste_data_images: true,
                    skin: 'oxide-dark',
                    content_css: 'dark',
                    placeholder: 'Escribe algo aquí...',
                }}
            />
        </div>
    )
}

export default AddConversacion