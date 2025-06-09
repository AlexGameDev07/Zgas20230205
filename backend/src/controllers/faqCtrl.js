import faqMdl from "../models/faqMdl.js";

const faqCtrl = {};

//GET
faqCtrl.getAllFaqs = async (req, res) => {
    try {
        const faqs = await faqMdl.find();
        res.status(200).json(faqs);

    } catch (error) {
        console.error("Error al obtener las preguntas frecuentes:", error);
        res.status(500).json({ message: "Error al obtener las preguntas frecuentes" });
    }
}

//POST
faqCtrl.createFaq = async (req, res) => {
    try {
        const { question, answer, level, isActive } = req.body;

        if (!question || !answer || !level) {
            return res.status(400).json({ message: "Faltan campos por llenar" });
        }
        if (level < 1 || level > 5) {
            return res.status(400).json({ message: "El nivel debe estar entre 1 y 5" });
        }
        if(answer.length < 4 || answer.length > 500) {
            return res.status(400).json({ message: "La respuesta debe tener entre 4 y 500 caracteres" });
        }

        const newFaq = new faqMdl({
            question,
            answer,
            level
        });

        await newFaq.save();
        res.status(201).json(newFaq);
    } catch (error) {
        console.error("Error al crear la pregunta frecuente:", error);
        res.status(500).json({ message: "Error al crear la pregunta frecuente" });
    }

}

//PUT
faqCtrl.updateFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer, level, isActive } = req.body;

        if (level < 1 || level > 5) {
            return res.status(400).json({ message: "El nivel debe estar entre 1 y 5" });
        }

        const updatedFaq = await faqMdl.findByIdAndUpdate(id, {
            question,
            answer,
            level,
            isActive
        }, { new: true });

        if (!updatedFaq) {
            return res.status(404).json({ message: "Pregunta frecuente no encontrada" });
        }

        res.status(200).json("Pregunta frecuente actualizada correctamente");
    } catch (error) {
        console.error("Error al actualizar la pregunta frecuente:", error);
        res.status(500).json({ message: "Error al actualizar la pregunta frecuente" });
    }
}
//DELETE
faqCtrl.deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFaq = await faqMdl.findByIdAndDelete(id);

        if (!deletedFaq) {
            return res.status(404).json({ message: "Pregunta frecuente no encontrada" });
        }

        res.status(200).json("Pregunta frecuente eliminada correctamente");
    } catch (error) {
        console.error("Error al eliminar la pregunta frecuente:", error);
        res.status(500).json({ message: "Error al eliminar la pregunta frecuente" });
    }
}
export default faqCtrl;