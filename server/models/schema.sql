CREATE TABLE "customer" (
	"id" serial NOT NULL,
	"username" varchar NOT NULL UNIQUE,
	"admin" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT customer_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "cart" (
	"id" serial NOT NULL,
	"customerid" integer NOT NULL,
	CONSTRAINT cart_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "item" (
	"id" serial NOT NULL,
	"quantity" integer NOT NULL,
	"title" varchar NOT NULL,
	"genre" varchar NOT NULL,
	"color" varchar NOT NULL,
	"image-path" varchar NOT NULL,
	"price" varchar NOT NULL,
	"cartid" integer NOT NULL,
	CONSTRAINT item_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "cart" ADD CONSTRAINT "cart_fk0" FOREIGN KEY ("customerid") REFERENCES "customer"("id");

ALTER TABLE "item" ADD CONSTRAINT "item_fk0" FOREIGN KEY ("cartid") REFERENCES "cart"("id");






CREATE TABLE "cartitem" (
	"id" serial NOT NULL,
	"cartid" integer NOT NULL,
	"quantity" integer NOT NULL,
	"itemid" integer NOT NULL,
	CONSTRAINT cartitem_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "cartitem" ADD CONSTRAINT "cartitem_fk0" FOREIGN KEY ("cartid") REFERENCES "cart"("id");
ALTER TABLE "cartitem" ADD CONSTRAINT "cartitem_fk1" FOREIGN KEY ("itemid") REFERENCES "Item"("id");



