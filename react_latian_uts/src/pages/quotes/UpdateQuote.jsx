import http from "@/api/apiClient";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useCallback, useEffect, useId, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function UpdateQuote() {
  const params = useParams();

  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    quote: "",
    author: "",
    year: "",
    category: "",
    source: "",
  });

  const fetchQuote = useCallback(async () => {
    try {
      const response = await http.get(`/quotes/${params.id}`);

      setForm(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const response = await http.put(`/quotes/${params.id}`, form);

      if (response.status === 200) {
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
          <Input
            id={useId()}
            name="quote"
            value={form.quote}
            onChange={handleOnChange}
            label="Quote"
            placeholder="Quote"
          />
          <Input
            id={useId()}
            name="author"
            value={form.author}
            onChange={handleOnChange}
            label="Author"
            placeholder="Author"
          />
          <Input
            id={useId()}
            name="year"
            type="number"
            value={form.year}
            onChange={handleOnChange}
            label="Year"
            placeholder="Year"
          />
          <Input
            id={useId()}
            name="category"
            value={form.category}
            onChange={handleOnChange}
            label="Category"
            placeholder="Category"
          />
          <Input
            id={useId()}
            name="source"
            value={form.source}
            onChange={handleOnChange}
            label="Source"
            placeholder="Source"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}