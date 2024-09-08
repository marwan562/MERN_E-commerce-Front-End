"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Image from "next/image";
import Link from "next/link";
import { ICategoriesTypes, IProductsTypes } from "@/interface";
import { useAppSelector } from "@/lib/store";
import { Button } from "./ui/button";

async function fetchProducts(): Promise<IProductsTypes[]> {
  const res = await fetch(`${process.env.BASE_URL}/product/getAll`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

async function getCategories(): Promise<ICategoriesTypes[]> {
  const res = await fetch(`${process.env.BASE_URL}/category/getAll`, {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

const NavSearch = () => {
  const [products, setProducts] = useState<IProductsTypes[]>([]);
  const [categories, setCategories] = useState<ICategoriesTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMoreProducts, setViewMoreProducts] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<IProductsTypes[]>(
    []
  );
  const { washlist } = useAppSelector((state) => state.washlist);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    const searchRegExp = new RegExp(searchTerm, "i");
    setFilteredProducts(
      searchTerm
        ? products.filter((product) => searchRegExp.test(product.title))
        : products
    );
  }, [searchTerm, products]);

  const productsWithWashlist = products.map((product) => ({
    ...product,
    inWashlist: washlist.some((item) => item.productId?._id === product?._id),
  }));

  const showProducts = viewMoreProducts
    ? productsWithWashlist
    : productsWithWashlist.slice(0, 4);

  return (
    <Dialog modal={false}>
      <DialogTrigger>
        <div className="items-center hidden md:flex space-x-2 hover:underline cursor-pointer tracking-wide font-bold text-[15px]">
          <span title="search">SEARCH</span>
          <Image src="/svg/search.svg" alt="search" width={14} height={15} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Search About Products</DialogTitle>
          <DialogClose className="absolute top-2 right-2"></DialogClose>
        </DialogHeader>
        <Command className="rounded-lg border shadow-md md:min-w-[300px]">
          <CommandInput
            placeholder="Type a product name..."
            value={searchTerm}
            onValueChange={(e) => setSearchTerm(e)}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Categories">
              {categories.map((category) => (
                <Link key={category._id} href={`/categories/${category.title}`}>
                  <CommandItem>
                    <Image
                      src={category.img}
                      alt={category.title}
                      width={24}
                      height={24}
                      className="mr-2 h-6 w-6 rounded-md object-cover"
                    />
                    <span className="font-mono">{category.title}</span>
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Products">
              {filteredProducts.length > 0 ? (
                showProducts.map((product) => (
                  <Link
                    key={product._id}
                    href={`/details-product/${product._id}`}
                  >
                    <CommandItem className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center">
                        <Image
                          src={product.img}
                          alt={product.title}
                          width={24}
                          height={24}
                          className="mr-2 h-6 w-6 rounded-md object-cover"
                        />
                        <span className="font-mono">{product.title}</span>
                      </div>
                      {product.inWashlist && (
                        <svg
                          className="text-red-600 transition-transform duration-300 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="red"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      )}
                    </CommandItem>
                  </Link>
                ))
              ) : (
                <CommandEmpty>No products found.</CommandEmpty>
              )}
              {productsWithWashlist.length > 4 && (
                <Button
                  onClick={() => setViewMoreProducts(!viewMoreProducts)}
                  className="mx-auto mt-4"
                  variant="link"
                >
                  Show {viewMoreProducts ? "Less" : "More"}
                </Button>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default NavSearch;
