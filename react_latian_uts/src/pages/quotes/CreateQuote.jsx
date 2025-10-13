import http from "@/api/apiClient";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateNewQuote() {
    // State untuk menyimpan status loading
    const navigation = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // State untuk menyimpan data form
    const [form, setForm] = useState({
        quote: "",
        author: "",
        year: "",
        category: "",
        source: ""
    });
    const handleOnChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await http.post("/quotes", form);

            if (response.status === 201) {

                navigation("/", {
                    replace: true,
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto">
            <form onSubmit={onSubmit}>
                <div className="space-y-3">
                    <Input id={useId()} name="quote" value={form.quote} onChange={handleOnChange} label="Quote" placeholder="Isi kutipan..." />
                    <Input id={useId()} name="author" value={form.author} onChange={handleOnChange} label="Author" placeholder="Nama penulis..." />
                    <Input id={useId()} name="year" type="number" value={form.year} onChange={handleOnChange} label="Year" placeholder="Tahun..." />
                    <Input id={useId()} name="category" value={form.category} onChange={handleOnChange} label="Category" placeholder="Kategori..." />
                    <Input id={useId()} name="source" value={form.source} onChange={handleOnChange} label="Source" placeholder="Sumber kutipan..." />

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    )
}