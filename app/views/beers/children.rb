def get_children(beer = self)
    @prior = @prior || [self]

    children = { beers: [], bonds: [] }

    beer.bonds.each do |bond|

      if !children[:bonds].include?(bond)
        children[:bonds].push(bond)

        if !children[:beers].include?(bond.source)
          children[:beers].push(bond.source)
        end

        if !children[:beers].include?(bond.target)
          children[:beers].push(bond.target)
        end

        if bond.source.id != self.id && bond.source.bonds.length > 0 && !(@prior.include?(bond.source))
            @prior << bond.source
            tmp = get_children(bond.source)
            children[:beers] += tmp[:beers]
            children[:bonds] += tmp[:bonds]
        end

        if bond.target.id != beer.id && bond.target.bonds.length > 0 && !(@prior.include?(bond.target))
            @prior << bond.target
            tmp = get_children(bond.target)
            children[:beers] += tmp[:beers]
            children[:bonds] += tmp[:bonds]
        end
      else
        break
      end
    end

    children[:beers].uniq!
    children[:bonds].uniq!
    return children
  end